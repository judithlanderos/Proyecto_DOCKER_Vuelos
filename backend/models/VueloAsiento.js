// Tabla intermedia N:M entre Vuelo y Asiento
// Maneja la disponibilidad de cada asiento por vuelo específico
// Principio SOLID: Single Responsibility — solo maneja el estado del asiento en el vuelo
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VueloAsiento = sequelize.define(
  "VueloAsiento",
  {
    id_vuelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_asiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.ENUM("disponible", "ocupado", "bloqueado"),
      allowNull: false,
      defaultValue: "disponible", // Todo asiento inicia disponible
    },
  },
  {
    tableName: "vuelo_asientos",
    timestamps: false,
  },
);

module.exports = VueloAsiento;
