// Modelo de Ruta — define el trayecto entre dos aeropuertos
// Una ruta puede tener muchos vuelos en distintas fechas
// Principio SOLID: Single Responsibility — solo maneja datos de la ruta
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ruta = sequelize.define(
  "Ruta",
  {
    id_ruta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    distancia_km: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    duracion_estimada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Duración en minutos", // Se almacena en minutos para mayor flexibilidad
    },
    id_origen: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia aeropuertos
    },
    id_destino: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia aeropuertos
    },
  },
  {
    tableName: "rutas",
    timestamps: false,
    modelName: "Ruta",
  },
);

module.exports = Ruta;
