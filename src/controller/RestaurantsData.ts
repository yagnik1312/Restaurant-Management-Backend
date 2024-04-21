import { RestaurantsData } from '../models/RestaurantsData';
import { setResponse } from '../common';
import { logger } from '../utils/logger';
import { Request, Response } from 'express';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const createRestaurantsData = async (req: any, res: any) => {
  try {
    const RestaurantsDataData = await RestaurantsData.create({ ...req.body, CREATED_ON: new Date(), MODIFIED_ON: new Date() })

    logger.info(`${req.body.description} - RestaurantsDataData is created successfully`)
    setResponse(res, 200, 'S', 'Successfully created', { RestaurantsDataData })
  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}
const createBulkRestaurantsData = async (req: any, res: any) => {
  try {
    const result = await RestaurantsData.bulkCreate(req.body)
    logger.info(`${req.body.description} - RestaurantsDataData is created successfully`)
    setResponse(res, 200, 'S', 'Successfully created', { result })




  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}


const findRestaurantsDataByRestaurantId = async (req: any, res: any) => {
  try {
    const data = await RestaurantsData.findAll({
      where: { restaurantId: req.params.id }
    })
    if (!data) {
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }

    setResponse(res, 200, 'S', "RestaurantsData details get from given Restaurants id..", data.length)
  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}

const findRestaurantsDataByFoodCategoryId = async (req: any, res: any) => {
  try {
    const data = await RestaurantsData.findAll({
      where: { foodCategoryId: req.params.id }
    })
    if (!data) {
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }
    setResponse(res, 200, 'S', "RestaurantsData details get from given FoodCategories id..", { data })
  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}


// GET /RestaurantsDatas?limit=10&skip=20`
// GET /RestaurantsDatas?sortBy=createdAt:desc
const restaurantsDataWithPagination = async (req: any, res: any) => {
  let parts: any
  let Search: any;
  if (req.query.sortBy) {
    parts = (<string>req.query.sortBy).split(':')
  }

  try {

    if (req.query.Search) {
      Search = req.query.Search.trim().toLowerCase();



      let result = await RestaurantsData.findAll({
        where: {
          restaurantId: req.params.id,
          foodName: {
            [Op.iLike ]: `%${Search}%`
          }
        },
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit)
      });
      const TotalResult = await RestaurantsData.findAll({
        where: {
          restaurantId: req.params.id,
          foodName: {
            [Op.iLike]: `%${Search}%`
          }
        }
      })
      
      setResponse(res, 200, 'S', 'Successfully get data', { result, count:TotalResult.length })


    }
    else {
      let result = await RestaurantsData.findAll({
        where: {
          restaurantId: req.params.id
        },
        order: [[parts[0], parts[1].toUpperCase()]],
        offset: parseInt(<any>req.query.skip),
        limit: parseInt(<any>req.query.limit)
      });

      const TotalResult = await RestaurantsData.findAll({
        where: {
          restaurantId: req.params.id

        }


      });
      setResponse(res, 200, 'S', 'Successfully get data', { result,count:TotalResult.length })

    }


    // console.log(req.params)

  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}

const restaurantsDataById = async (req: any, res: any) => {
  const id = req.params.id

  try {
    const RestaurantsDataData = await RestaurantsData.findOne({ where: { foodId: id } })

    if (!RestaurantsDataData) {
      logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }

    logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 200, 'S', 'get detail by Id', { RestaurantsDataData })
  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}

const updateRestaurantsData = async (req: any, res: any) => {
  try {
    const RestaurantsDataData = await RestaurantsData.findOne({ where: { foodId: req.params.id } })

    if (!RestaurantsDataData) {
      logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      //return res.status(404).send()
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }
    await RestaurantsData.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { foodId: req.params.id } });

    logger.info(`${req.params.id} - RestaurantsDataData is updated`)
    setResponse(res, 200, 'S', 'Successfully update', { RestaurantsDataData })
  } catch (e) {
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 400, 'E', 'error', { e })
  }
}

const deleteRestaurantsData = async (req: any, res: any) => {
  try {
    const RestaurantsDataData = await RestaurantsData.findOne({ where: { foodId: req.params.id } })

    if (!RestaurantsDataData) {
      logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return setResponse(res, 404, 'E', 'No Data Available.', {})
    }
    await RestaurantsData.destroy({ where: { foodId: req.params.id } });

    logger.info(`${req.params.id} - Deleted successfully`)
    setResponse(res, 200, 'S', 'Successfully delete', { RestaurantsDataData })
  } catch (e) {
    logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    setResponse(res, 500, 'E', 'error', { e })
  }
}

module.exports = {
  createRestaurantsData,
  createBulkRestaurantsData,
  findRestaurantsDataByRestaurantId,
  findRestaurantsDataByFoodCategoryId,
  restaurantsDataWithPagination,
  restaurantsDataById,
  updateRestaurantsData,
  deleteRestaurantsData
}