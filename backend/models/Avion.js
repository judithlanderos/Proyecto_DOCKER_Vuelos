// Modelo de Avion — representa la flota aérea disponible
// Un avión puede operar muchos vuelos pero solo uno a la vez
// Principio SOLID: Single Responsibility — solo maneja datos del avión
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Avion = sequelize.define(
  "Avion",
  {
    id_avion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matricula: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true, // Matrícula única por avión
    },
    modelo: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    fabricante: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    capacidad_total: {
      type: DataTypes.INTEGER,
      allowNull: false, // Capacidad total de asientos del avión
    },
  },
  {
    tableName: "aviones",
    timestamps: false,
  },
);

module.exports = Avion;
