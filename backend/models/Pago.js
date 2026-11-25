// Modelo de Pago — registra el pago asociado a un grupo de reservas
// Si una reserva se cancela, el pago se conserva con estado reembolsado
// Principio SOLID: Single Responsibility — solo maneja datos del pago
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pago = sequelize.define(
  "Pago",
  {
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metodo: {
      type: DataTypes.ENUM("tarjeta", "transferencia", "puntos"),
      allowNull: false,
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    moneda: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "MXN", // Moneda por defecto pesos mexicanos
    },
    fecha_transaccion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM("completado", "reembolsado", "cancelado"),
      allowNull: false,
      defaultValue: "completado",
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK hacia grupo_reserva
    },
  },
  {
    tableName: "pagos",
    timestamps: false,
  },
);

module.exports = Pago;
