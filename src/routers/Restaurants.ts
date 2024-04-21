import express, {Request,Response,Application} from 'express';
const validateRestaurants = require('../validators/Restaurants')
import {auth} from '../middleware/auth';
import { setResponse } from '../common';
import {checkAccess} from '../middleware/uservalidate';
const RestaurantsController  = require('../controller/Restaurants');
const router:Application = express();

router.post('/Restaurantss',[validateRestaurants.validateRestaurantsData],RestaurantsController.createRestaurants )

router.get('/getAllRestaurantss',RestaurantsController.getAllRestaurantsrDetails )
router.get('/Restaurantss',RestaurantsController.restaurantsWithPagination )
router.get('/RestaurantssCategory',RestaurantsController.getCategoryRestaurantsrDetails )

router.get('/Restaurantss/:id', [validateRestaurants.getValidateData],RestaurantsController.restaurantsById )

router.patch('/Restaurantss/:id',[validateRestaurants.updateValidateData, auth], RestaurantsController.updateRestaurants)

router.delete('/Restaurantss/:id', [validateRestaurants.getValidateData, auth], RestaurantsController.deleteRestaurants)


module.exports = router