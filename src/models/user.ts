import { sequelizeConnection as sequelize } from "../db/sql";
import {DataTypes} from 'sequelize';



export const User = sequelize.define('Users', {
  userId : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: DataTypes.BIGINT,
    required: true,
    default: 0,
  },
  password: {
    type: DataTypes.STRING(255),
    required: true,
    minlength: 7,
    trim: true,
  },
  gender: {
    type: DataTypes.STRING(255),
    required: true,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(255),
    required: true,
    allowNull: false
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    default: 0,
  }
 
}, {
  timestamps: true
})



