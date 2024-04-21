import {Order} from'../models/Order';
import { setResponse } from '../common';
import {logger} from '../utils/logger';
import {Request,Response} from 'express';

const createOrder = async (req:any, res:any) => {
  try {
    console.log('req.user', req.user)
    const OrderData =await Order.create({ ...req.body, CREATED_ON: new Date(), MODIFIED_ON: new Date() })
      logger.info(`${req.body.description} - OrderData is created successfully`)
      setResponse(res,200,'S','Successfully created',{OrderData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}


const findOrderByUserID = async (req:any, res:any) => {
  try {
      const data = await Order.findAll({ 
        where: { UserID: req.params.id }
      })
      if (!data) {
          return setResponse(res,404,'E','No Data Available.',{})
      }
      setResponse(res,200,'S',"Order details get from given user id..",{data})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}


// GET /Orders?limit=10&skip=20`
// GET /Orders?sortBy=createdAt:desc
const orderWithPagination = async (req:any, res:any) => {
    let parts:any 

    if (req.query.sortBy) {
        parts = (<string>req.query.sortBy).split(':')
    }

    try {
            let result = await Order.findAll({ 
              order: [[parts[0], parts[1].toUpperCase()]],
              offset: parseInt(<any>req.query.skip),
              limit: parseInt(<any>req.query.limit)
            });
            
            setResponse(res,200,'S','Successfully get data',{result})
    } catch (e) {
        logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        setResponse(res,500,'E','error',{e})
    }
}

const orderById = async (req:any, res:any) => {
  const id = req.params.id

  try {
      const OrderData = await Order.findOne({ where: { OrderId: id } })

      if (!OrderData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }

      logger.info(`201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,200,'S','get detail by Id',{OrderData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

const updateOrder = async (req:any, res:any) => {
  try {
    const OrderData = await Order.findOne({ where: { OrderId: req.params.id } })

      if (!OrderData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          //return res.status(404).send()
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await Order.update({ ...req.body, MODIFIED_ON: new Date() }, { where: { OrderId: req.params.id } });

      logger.info(`${req.params.id} - OrderData is updated`)
      setResponse(res,200,'S','Successfully update',{OrderData})
  } catch (e) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,400,'E','error',{e})
  }
}

const deleteOrder = async (req:any, res:any) => {
  try {
      const OrderData = await Order.findOne({ where: { OrderId: req.params.id } })

      if (!OrderData) {
          logger.info(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
          return setResponse(res,404,'E','No Data Available.',{})
      }
      await Order.destroy({ where: { OrderId: req.params.id } });

      logger.info(`${req.params.id} - Deleted successfully`)
      setResponse(res,200,'S','Successfully delete',{OrderData})
  } catch (e) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      setResponse(res,500,'E','error',{e})
  }
}

module.exports = { createOrder, 
  findOrderByUserID,
  orderWithPagination,
  orderById,
  updateOrder, 
  deleteOrder 
}