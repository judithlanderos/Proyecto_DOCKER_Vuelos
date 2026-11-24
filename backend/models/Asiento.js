// Modelo de VueloAsiento — tabla intermedia que maneja disponibilidad por vuelo
// Principio SOLID: Single Responsibility — solo maneja el estado del asiento en un vuelo
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VueloAsiento = sequelize.define(
  "VueloAsiento",
  {
    id_vuelo_asiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_vuelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_asiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("disponible", "ocupado", "bloqueado"),
      defaultValue: "disponible",
    },
  },
  {
    tableName: "vuelo_asientos",
    timestamps: false,
  },
);

module.exports = VueloAsiento;
