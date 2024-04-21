import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';

export const FoodCategories = sequelize.define('FoodCategories', {
  foodCategoryId : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  foodCategory : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  CREATED_ON: {
    type: DataTypes.DATE,
    allowNull: false
  },
  MODIFIED_ON: {
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  sequelize,
  tableName: 'FoodCategories',
  timestamps: false,
  indexes: [
    {
      name: 'foodcategories_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'foodCategoryId' }
      ]
    }
  ]
})