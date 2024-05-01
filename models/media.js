import { DataTypes } from "sequelize";
import { sequelize } from "../Config.js";

export const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaType: {
    type: DataTypes.ENUM,
    values: ['video', 'audio', 'image'],
    allowNull: false,
  },
  mediaSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
});
