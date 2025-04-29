import { Sequelize } from 'sequelize';
import path from 'path';

// Create a new Sequelize instance with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false,
});

export default sequelize;