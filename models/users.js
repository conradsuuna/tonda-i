import { DataTypes } from "sequelize";
import { sequelize } from "../Config.js";

export const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userRole: {
    type: DataTypes.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
  }
});
