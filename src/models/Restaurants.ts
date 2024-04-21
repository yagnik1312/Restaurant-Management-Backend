import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';

export const Restaurants = sequelize.define('Restaurants', {
  restaurantId : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  restaurantName : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  description : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  address : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  category : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  rating : {
    type: DataTypes.FLOAT,
    allowNull: false,
  },  
  imgUrl : {
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
  tableName: 'Restaurants',
  timestamps: false,
  indexes: [
    {
      name: 'restaurants_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'restaurantId' }
      ]
    }
  ]
}) 