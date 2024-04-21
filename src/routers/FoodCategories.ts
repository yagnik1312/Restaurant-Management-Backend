import express, {Request,Response,Application} from 'express';
const validateFoodCategories = require('../validators/FoodCategories')
import {auth} from '../middleware/auth';
import { setResponse } from '../common';
import {checkAccess} from '../middleware/uservalidate';
const FoodCategoriesController  = require('../controller/FoodCategories');
const router:Application = express();

router.post('/FoodCategoriess',[validateFoodCategories.validateFoodCategoriesData, ],FoodCategoriesController.createFoodCategories )



router.get('/FoodCategoriess', [auth,checkAccess],FoodCategoriesController.foodCategoriesWithPagination )

router.get('/FoodCategoriess/:id', [validateFoodCategories.getValidateData,auth,checkAccess],FoodCategoriesController.foodCategoriesById )

router.patch('/FoodCategoriess/:id',[validateFoodCategories.updateValidateData, auth,checkAccess], FoodCategoriesController.updateFoodCategories)

router.delete('/FoodCategoriess/:id', [validateFoodCategories.getValidateData, auth,checkAccess], FoodCategoriesController.deleteFoodCategories)


module.exports = router