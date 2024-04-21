import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';
import {Restaurants} from './Restaurants';  
import {FoodCategories} from './FoodCategories';  

export const RestaurantsData = sequelize.define('RestaurantsData', {
  foodId : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  restaurantId : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'restaurantId'
    }
  },  
  foodCategoryId : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'FoodCategories',
      key: 'foodCategoryId'
    }
  },  
  foodName : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  foodPrice : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  foodDescription : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  foodCategory : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  foodImage : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  CREATED_ON: {
    type: DataTypes.DATE,
    allowNull: true
  },
  MODIFIED_ON: {
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  sequelize,
  tableName: 'RestaurantsData',
  timestamps: false,
  indexes: [
    {
      name: 'restaurantsdata_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'foodId' }
      ]
    },
    {
      name: 'FK_RESTAURANTSDATA_RESTAURANTID',        
      using: 'BTREE',
      fields: [
        { name: 'restaurantId' }
      ]
    },
    {
      name: 'FK_RESTAURANTSDATA_FOODCATEGORYID',        
      using: 'BTREE',
      fields: [
        { name: 'foodCategoryId' }
      ]
    }
  ]
})
Restaurants.hasOne(RestaurantsData, {
  foreignKey: 'restaurantId',
  sourceKey: 'restaurantId'
})
  
RestaurantsData.belongsTo(Restaurants, {
  foreignKey: 'restaurantId',
  sourceKey: 'restaurantId'
})

FoodCategories.hasOne(RestaurantsData, {
  foreignKey: 'foodCategoryId',
  sourceKey: 'foodCategoryId'
})
  
RestaurantsData.belongsTo(FoodCategories, {
  foreignKey: 'foodCategoryId',
  sourceKey: 'foodCategoryId'
})
