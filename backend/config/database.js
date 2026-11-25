// Principio SOLID - Single Responsibility: este archivo solo maneja la conexion a la BD
// Patron de diseño - Singleton: una sola instancia de Sequelize en toda la aplicacion
// Clean Code: variables de entorno para evitar datos sensibles en el codigo

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;