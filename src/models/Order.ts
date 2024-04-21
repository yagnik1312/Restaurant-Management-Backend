import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';
import { User } from './user';
export const Order = sequelize.define('Order', {
  OrderId : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  }, 
  
  // if User relation not found Error come then comment reference object in below UserID
  UserID : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model:'User',
      key: 'userId'
    }
  },  
  Amount : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  FoodItems : {
    type: DataTypes.ARRAY(DataTypes.STRING),
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
  tableName: 'Order',
  timestamps: false,
  indexes: [
    {
      name: 'order_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'OrderId' }
      ]
    },
    {
      name: 'FK_ORDER_USERID',        
      using: 'BTREE',
      fields: [
        { name: 'UserID' }
      ]
    }
  ]
}) 
User.hasOne(Order, {
  foreignKey: 'UserID',
  sourceKey: 'userId'
})
  
Order.belongsTo(User, {
  foreignKey: 'UserID',
  sourceKey: 'userId'
})
