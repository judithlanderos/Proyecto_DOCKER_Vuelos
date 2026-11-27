// Modelo de Aeropuerto — representa los aeropuertos origen y destino de las rutas
// Principio SOLID: Single Responsibility — solo maneja datos del aeropuerto
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Aeropuerto = sequelize.define(
  "Aeropuerto",
  {
    id_aeropuerto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_iata: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: "aeropuertos",
    timestamps: false,
  },
);

module.exports = Aeropuerto;
