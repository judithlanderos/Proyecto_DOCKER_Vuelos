// Modelo de Vuelo — representa cada vuelo programado en una ruta específica
// Principio SOLID: Single Responsibility — solo maneja datos del vuelo
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vuelo = sequelize.define(
  "Vuelo",
  {
    id_vuelo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_vuelo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true, // Código único por vuelo ej. AM123
    },
    fecha_salida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_llegada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(
        "programado",
        "retrasado",
        "cancelado",
        "completado",
      ),
      allowNull: false,
      defaultValue: "programado", // Todo vuelo inicia como programado
    },
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia rutas
    },
    id_avion: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia aviones
    },
  },
  {
    tableName: "vuelos",
    timestamps: false,
  },
);

module.exports = Vuelo;
