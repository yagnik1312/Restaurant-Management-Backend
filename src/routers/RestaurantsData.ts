import express, {Request,Response,Application} from 'express';
const validateRestaurantsData = require('../validators/RestaurantsData')
import {auth} from '../middleware/auth';
import { setResponse } from '../common';
import {checkAccess} from '../middleware/uservalidate';
const RestaurantsDataController  = require('../controller/RestaurantsData');
const router:Application = express();

router.post('/RestaurantsDatas',[validateRestaurantsData.validateRestaurantsDataData, auth,checkAccess],RestaurantsDataController.createRestaurantsData )
router.post('/BulkRestaurantsDatas',[],RestaurantsDataController.createBulkRestaurantsData )


router.get('/RestaurantsData-Restaurantss/:id',RestaurantsDataController.findRestaurantsDataByRestaurantId )

router.get('/RestaurantsData-FoodCategoriess/:id',RestaurantsDataController.findRestaurantsDataByFoodCategoryId )


router.get('/RestaurantsDatas/:id',RestaurantsDataController.restaurantsDataWithPagination )

router.get('/RestaurantsDatas/:id', [validateRestaurantsData.getValidateData],RestaurantsDataController.restaurantsDataById )

router.patch('/RestaurantsDatas/:id',[validateRestaurantsData.updateValidateData, auth], RestaurantsDataController.updateRestaurantsData)

router.delete('/RestaurantsDatas/:id', [validateRestaurantsData.getValidateData, auth], RestaurantsDataController.deleteRestaurantsData)


module.exports = router