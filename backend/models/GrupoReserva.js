// Modelo de GrupoReserva — agrupa reservas de múltiples pasajeros en un solo pago
// Resuelve el caso de reserva grupal del ejercicio
// Principio SOLID: Single Responsibility — solo maneja datos del grupo
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GrupoReserva = sequelize.define(
  "GrupoReserva",
  {
    id_grupo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING(45),
      allowNull: true, // Descripción opcional del grupo
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Se registra automáticamente
    },
    id_pasajero_responsable: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK — pasajero que gestiona el grupo
    },
  },
  {
    tableName: "grupo_reserva",
    timestamps: false,
  },
);

module.exports = GrupoReserva;
