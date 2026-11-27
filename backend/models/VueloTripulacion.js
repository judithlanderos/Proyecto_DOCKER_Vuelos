// Tabla intermedia N:M entre Vuelo y Tripulacion
// El rol_en_vuelo puede diferir del rol base del miembro
// Principio SOLID: Single Responsibility — solo maneja la asignación de tripulación por vuelo
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VueloTripulacion = sequelize.define(
  "VueloTripulacion",
  {
    id_vuelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_tripulacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    rol_en_vuelo: {
      type: DataTypes.ENUM("piloto", "copiloto", "auxiliar"),
      allowNull: false, // Rol específico en este vuelo
    },
  },
  {
    tableName: "vuelo_tripulacion",
    timestamps: false,
  },
);

module.exports = VueloTripulacion;
