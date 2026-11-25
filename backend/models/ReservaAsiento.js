// Tabla intermedia N:M entre Reserva y Asiento
// Registra el precio pagado por cada asiento en la reserva
// Principio SOLID: Single Responsibility — solo maneja la relación reserva-asiento
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ReservaAsiento = sequelize.define(
  "ReservaAsiento",
  {
    id_reserva_asiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // Precio pagado por este asiento específico
    },
    id_reserva: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia reservas
    },
    id_asiento: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia asientos
    },
  },
  {
    tableName: "reserva_asiento",
    timestamps: false,
  },
);

module.exports = ReservaAsiento;
