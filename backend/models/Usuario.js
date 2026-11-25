// Modelo de Usuario — gestiona el acceso al sistema (login/registro)
// Principio SOLID: Single Responsibility — solo maneja datos de autenticación
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true, // No permite correos duplicados
    },
    password: {
      type: DataTypes.STRING(255), // 255 para almacenar el hash de bcrypt
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("admin", "usuario"),
      allowNull: false,
      defaultValue: "usuario",
    },
    genero: {
      type: DataTypes.ENUM("masculino", "femenino"),
      allowNull: false, // Obligatorio para el mensaje de bienvenida
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  },
);

module.exports = Usuario;
