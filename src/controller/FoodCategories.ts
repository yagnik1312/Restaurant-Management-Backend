import {FoodCategories} from'../models/FoodCategories';
import { setResponse } from '../common';
import {logger} from '../utils/logger';
import {Request,Response} from 'express';

const createFoodCategories = async (req:any, res:any) => {
  try {
    const FoodCategoriesData =await FoodCategories.create(
      { ...req.body, CREATED_ON: new Date(), MODIFIED_ON: new Date() 
      })

      logger.info(`${req.body.description} - FoodCategoriesData is created successfully`)
      setResponse(res,200,'S','Successfully created',{FoodCategoriesData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}



// GET /FoodCategoriess?limit=10&skip=20`
// GET /FoodCategoriess?sortBy=createdAt:desc
const foodCategoriesWithPagination = async (req:any, res:any) => {
    let parts:any 
  

    if (req.query.sortBy) {
        parts = (<string>req.query.sortBy).split(':')
    }

    try {
      console.log(parts,"Parts")
            let result = await FoodCategories.findAll({ 
           
              order: [[parts[0], parts[1].toUpperCase()]],
              offset: parseInt(<any>req.query.skip),
              limit: parseInt(<any>req.query.limit)
            });
            
            setResponse(res,200,'S','Successfully get data',{result})
    } catch (e) {
      console.log("Pagination>---------------")
        logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        setResponse(res,500,'E','error',{e})
    }
}

const foodCategoriesById = async (req:any, res:any) => {
  const id = req.params.id

  try {
      const FoodCategoriesData = await FoodCategories.findOne({ where: { foodCategoryId: id } })

      if (!FoodCategoriesData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }

      logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,200,'S','get detail by Id',{FoodCategoriesData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

const updateFoodCategories = async (req:any, res:any) => {
  try {
    const FoodCategoriesData = await FoodCategories.findOne({ where: { foodCategoryId: req.params.id } })

      if (!FoodCategoriesData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          //return res.status(404).send()
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await FoodCategories.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { foodCategoryId: req.params.id } });

      logger.info(`${req.params.id} - FoodCategoriesData is updated`)
      setResponse(res,200,'S','Successfully update',{FoodCategoriesData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}

const deleteFoodCategories = async (req:any, res:any) => {
  try {
      const FoodCategoriesData = await FoodCategories.findOne({ where: { foodCategoryId: req.params.id } })

      if (!FoodCategoriesData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await FoodCategories.destroy({ where: { foodCategoryId: req.params.id } });

      logger.info(`${req.params.id} - Deleted successfully`)
      setResponse(res,200,'S','Successfully delete',{FoodCategoriesData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

module.exports = { createFoodCategories, 
  foodCategoriesWithPagination,
  foodCategoriesById,
  updateFoodCategories, 
  deleteFoodCategories 
}