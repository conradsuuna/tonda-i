import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './TondaDB.sqlite',
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection with SQLite has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export default connectDB;

