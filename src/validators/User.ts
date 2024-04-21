import Joi from "joi";

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  phoneNumber: Joi.number(),
  state: Joi.string(),
  gender: Joi.string()
});


export const validateUserData = async (req: any, res: any, next: any) => {
  try {
    const reqData = req.body;
    const value = await schema.validateAsync(reqData);
    
    next();
  } catch (err) {
    console.log('user Valodaiton Fail')
    res.status(400).send(err);
  }
};

const getDataSchema = Joi.object({
  id: Joi.string(),
});


export const getValidateData = async (req: any, res: any, next: any) => {
  try {
    const value = await getDataSchema.validateAsync({ id: req.params.id });
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateDataSchema = Joi.object({
  id: Joi.string(),
  reqBody: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phoneNumber: Joi.number(),
    state: Joi.string(),
    gender: Joi.string()
  }),
});


export const updateValidateData = async (req: any, res: any, next: any) => {
  try {
    const validateData = { id: req.params.id, reqBody: req.body };
    const value = await updateDataSchema.validateAsync(validateData);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};


const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),

});
export const loginValidationData = async (req:any, res:any, next:any) => {
  try {
    const reqData = req.body
    const value = await loginSchema.validateAsync(reqData);
    next();
  } catch (error) {
    res.status(400).send(error);

  }
}