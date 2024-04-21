import express, {Request,Response,Application} from 'express';
const validateOrder = require('../validators/Order')
import {auth} from '../middleware/auth';
import { setResponse } from '../common';
import {checkAccess} from '../middleware/uservalidate';
const OrderController  = require('../controller/Order');
const router:Application = express();

router.post('/Orders',[validateOrder.validateOrderData, auth],OrderController.createOrder )


router.get('/Order-users/:id', [auth],OrderController.findOrderByUserID )


router.get('/Orders', [auth],OrderController.orderWithPagination )

router.get('/Orders/:id', [validateOrder.getValidateData,auth,checkAccess],OrderController.orderById )

router.patch('/Orders/:id',[validateOrder.updateValidateData, auth,checkAccess], OrderController.updateOrder)

router.delete('/Orders/:id', [validateOrder.getValidateData, auth,checkAccess], OrderController.deleteOrder)

module.exports = router