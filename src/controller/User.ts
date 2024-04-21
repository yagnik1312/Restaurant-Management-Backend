import { Request, Response } from "express";
import bcrypt = require("bcryptjs");
import { User } from "../models/user";
import { logger } from "../utils/logger";
// import { checkAccess } from "../middleware/uservalidate";
import { sendmail } from "../emails/nodemailer";
import { setResponse } from "../common";
import { config } from '../../config/configFile';
import jwt = require("jsonwebtoken");

const email = config.getEmail();
const pwd = config.getPassword();

const generateAuthToken = (id: any) => {
  return jwt.sign({ _id: id.toString() }, config.getJwtSecretKey())// process.env.JWT_SECRET)
}

const generateTokenByEmail = (email: any) => {
  return jwt.sign({ user: email }, config.getJwtSecretKey())// process.env.JWT_SECRET)
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, gender, name, email, password, state } = req.body
    const user = await User.findOne({ where: {email:req.body.email } })
    if (!user) {
      const newUser = await User.create({ ...req.body, password: await bcrypt.hash(password, 8) ,createdAt:new Date()})
      const token = generateAuthToken(newUser.dataValues.userId)
      // sendmail([req.body.email], 'Welcome to Synoverge', `<b>Hello ${req.body.name}</b>`)
      logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return setResponse(res, 200, 'S', 'Successfully created', { newUser, token })

    }

    else {
      logger.info(`201 User already exists || ${email} `)
      return setResponse(res, 201, 'E', 'User already exists')
    }
  } catch (e) {
    logger.error('error in user controller', e)
    return setResponse(res, 400, 'E', 'error in create user')
  }
}

const login = async (req: Request, res: Response) => {

  try {
    // if (config.getTestMode() === true) {
    //   const token = await generateTokenByEmail({
    //     email: email,
    //     password: pwd
    //   })

    //   console.log('inside if');
    //   setResponse(res, 200, 'S', 'login success', { token })
    // }

    // else {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      console.log("Email Not Matched")
      return setResponse(res, 400, 'E', 'Email not Matched');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.dataValues.password)
    if (!isMatch) {
      console.log("Password Not Matched")
      return setResponse(res, 400, 'E', 'Password Not Matched');
    }


    const token = await generateAuthToken(user.dataValues.userId)
    return setResponse(res, 200, 'S', 'login success', { user, token })

  } catch (e) {
    return setResponse(res, 500, 'E', 'Unable to login', { e });
  }
}

const getUserDetails = async (req: any, res: Response) => { //,checkAccess
  const user = await User.findOne({ where: { userId: req.user.id } })
  logger.info(`201 || successfully get user - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  setResponse(res, 200, 'S', 'Successfully get user detail', { user })
}
const getLogedinUser = async (req: any, res: Response) => { //,checkAccess
  // const user = await User.findOne({ where: { userId: req.user.id } })
  const user = req.user
  logger.info(`201 || successfully get LogedIn userData - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  setResponse(res, 200, 'S', 'Successfully get LogedIn user detail', { user })
}

//only Admin can get all user
const getAllUserDetails = async (req: any, res: Response) => {
  try {
    const users = await User.findAll()
    if (!users) {
      return res.status(404).send()
    }
    logger.info(`201 || successfully get All user - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    setResponse(res, 200, 'S', 'Successfully get all user', { users })
  } catch (e) {
    setResponse(res, 500, 'E')
  }
}

const updateUser = async (req: any, res: Response) => { //,checkAccess
  const updates = Object.keys(req.body)
  const allowedUpdates = ["phoneNumber", "gender", "name", "email", "password", "state"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const user = await User.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { userId: req.user.id } })
    setResponse(res, 200, 'S', 'Successfully update user')
  } catch (e) {
    res.status(400).send(e)
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
}

const deleteUser = async (req: any, res: Response) => { //,checkAccess
  try {
    await User.destroy({ where: { userId: req.body.id } })

    setResponse(res, 200, 'S', 'Successfully delete user')

  } catch (e) {
    res.status(500).send()
  }
}


const controller = {
  createUser,
  login,
  getUserDetails,
  getAllUserDetails,
  updateUser,
  deleteUser,
  getLogedinUser
};

export { controller as userController };