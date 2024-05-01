import { DataTypes } from "sequelize";
import { sequelize } from "../Config.js";
import { User } from "./users";

// assuming that everything that is liked and subscribed to is a favorite
export const Favorite = sequelize.define('Favorites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mediaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
});
