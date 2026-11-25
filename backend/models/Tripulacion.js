// Modelo de Tripulacion — representa a los miembros de la tripulación
// Un miembro puede participar en muchos vuelos
// Principio SOLID: Single Responsibility — solo maneja datos de tripulación
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tripulacion = sequelize.define(
  "Tripulacion",
  {
    id_tripulacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    primer_apellido: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    segundo_apellido: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    nacionalidad: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("piloto", "copiloto", "auxiliar"),
      allowNull: false, // Rol base del miembro en la aerolínea
    },
  },
  {
    tableName: "tripulacion",
    timestamps: false,
  },
);

module.exports = Tripulacion;
