// Modelo de Reserva — representa la reserva de un pasajero en un vuelo
// Pertenece a un grupo para soportar reservas grupales
// Principio SOLID: Single Responsibility — solo maneja datos de la reserva
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reserva = sequelize.define(
  "Reserva",
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_reserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Se registra automáticamente
    },
    estado: {
      type: DataTypes.ENUM("confirmada", "cancelada", "en_espera"),
      allowNull: false,
      defaultValue: "confirmada",
    },
    id_vuelo: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia vuelos
    },
    id_pasajero: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia pasajeros
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia grupo_reserva
    },
    clase: {
      type: DataTypes.ENUM("turista", "ejecutiva", "primera"),
      allowNull: false,
      defaultValue: "turista",
    },
    precio_pagado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "reservas",
    timestamps: false,
  },
);

module.exports = Reserva;
