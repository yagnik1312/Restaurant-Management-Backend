import { Restaurants } from '../models/Restaurants';
import { setResponse } from '../common';
import { logger } from '../utils/logger';
import { Request, Response } from 'express';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const createRestaurants = async (req: any, res: any) => {
  try {
    const RestaurantsData = await Restaurants.create(
      {
        ...req.body, CREATED_ON: new Date(), MODIFIED_ON: new Date()
      })
    // console.log(RestaurantsData,"<_______RR")
    logger.info(`${req.body.description} - RestaurantsData is created successfully`)
    setResponse(res, 200, 'S', 'Successfully created', { RestaurantsData })
  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}



// GET /Restaurantss?limit=10&skip=20`
// GET /Restaurantss?sortBy=createdAt:desc
const restaurantsWithPagination = async (req: any, res: any) => {
  let parts: any
  const { sortby } = req.query;
  let Search: any;

  if (req.query.sortBy) {
    parts = (<string>req.query.sortBy).split(':')
  }
  try {
    if (req.query.Search) {
      Search = req.query.Search.toUpperCase().trim()
      let result = await Restaurants.findAll({
        where: {
          restaurantName: {
            [Op.iLike]: `%${Search}%`
          }
        },
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit)
      });
      const TotalResult = await Restaurants.findAll({
        where: {
          restaurantName: {
            [Op.iLike]: `%${Search}%`
          }
        },
      });
      setResponse(res, 200, 'S', 'Successfully get data', { result,count:TotalResult.length })
    }
    else {


      let result = await Restaurants.findAll({
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit)
      });

      let Total = await Restaurants.findAll({
        order: [[parts[0], parts[1].toUpperCase()]],
      });

      setResponse(res, 200, 'S', 'Successfully get data', { result, count:Total.length })
    }

  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}
const getAllRestaurantsrDetails = async (req: any, res: Response) => {
  try {
    const result = await Restaurants.findAll()
    if (!result) {
      return res.status(404).send()
    }
    logger.info(`201 || successfully get All Restaurants - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    setResponse(res, 200, 'S', 'Successfully get all Restaurants', result.length)
  } catch (e) {
    setResponse(res, 500, 'E')
  }
}
const getCategoryRestaurantsrDetails = async (req: any, res: Response) => {
  let parts: any
  const { sortby } = req.query;
  
console.log(req.query.category,"Cateeeee")
  if (req.query.sortBy) {
    parts = (<string>req.query.sortBy).split(':')
  }
  try {
  
      let result = await Restaurants.findAll({
        where: {
          category: req.query.category
        },
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit)
      });
      const TotalResult = await Restaurants.findAll({
        where: {
          category: req.query.category
        }
      });
      setResponse(res, 200, 'S', 'Successfully get data', { result,count:TotalResult.length })
  
   

  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}
const restaurantsById = async (req: any, res: any) => {
  const id = req.params.id

  try {
    const RestaurantsData = await Restaurants.findOne({ where: { restaurantId: id } })

    if (!RestaurantsData) {
      logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }

    logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 200, 'S', 'get detail by Id', { RestaurantsData })
  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}

const updateRestaurants = async (req: any, res: any) => {
  try {
    const RestaurantsData = await Restaurants.findOne({ where: { restaurantId: req.params.id } })

    if (!RestaurantsData) {
      logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      //return res.status(404).send()
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }
    await Restaurants.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { restaurantId: req.params.id } });

    logger.info(`${req.params.id} - RestaurantsData is updated`)
    setResponse(res, 200, 'S', 'Successfully update', { RestaurantsData })
  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}

const deleteRestaurants = async (req: any, res: any) => {
  try {
    const RestaurantsData = await Restaurants.findOne({ where: { restaurantId: req.params.id } })

    if (!RestaurantsData) {
      logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }
    await Restaurants.destroy({ where: { restaurantId: req.params.id } });

    logger.info(`${req.params.id} - Deleted successfully`)
    setResponse(res, 200, 'S', 'Successfully delete', { RestaurantsData })
  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}

module.exports = {
  createRestaurants,
  restaurantsWithPagination,
  getAllRestaurantsrDetails,
  restaurantsById,
  updateRestaurants,
  deleteRestaurants,
  getCategoryRestaurantsrDetails
}