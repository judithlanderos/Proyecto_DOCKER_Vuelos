// Modelo de Pasajero — representa a los clientes que realizan reservas
// Al registrarse un usuario, se crea automáticamente su pasajero vinculado
// Principio SOLID: Single Responsibility — solo maneja datos del pasajero
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pasajero = sequelize.define(
  "Pasajero",
  {
    id_pasajeros: {
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
    correo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    nacionalidad: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    num_pasaporte: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true, // Opcional — admin puede crear pasajeros sin usuario
    },
  },
  {
    tableName: "pasajeros",
    timestamps: false,
  },
);

module.exports = Pasajero;
