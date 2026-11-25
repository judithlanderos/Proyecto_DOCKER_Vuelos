// Principio SOLID - Single Responsibility: este archivo solo define asociaciones entre modelos
// Principio SOLID - Open/Closed: nuevos modelos se agregan sin modificar los existentes
// Patron de diseño - Repository: centraliza el acceso a todos los modelos en un solo lugar
// Clean Code: asociaciones claramente agrupadas y comentadas por entidad


const sequelize = require("../config/database");

// Importar modelos
const Usuario = require("./Usuario");
const Pasajero = require("./Pasajero");
const Aeropuerto = require("./Aeropuerto");
const Ruta = require("./Ruta");
const Avion = require("./Avion");
const Vuelo = require("./Vuelo");
const Asiento = require("./Asiento");
const VueloAsiento = require("./VueloAsiento");
const GrupoReserva = require("./GrupoReserva");
const Pago = require("./Pago");
const Reserva = require("./Reserva");
const ReservaAsiento = require("./ReservaAsiento");
const Tripulacion = require("./Tripulacion");
const VueloTripulacion = require("./VueloTripulacion");

// ─── Asociaciones ───────────────────────────────────────

// Usuario → Pasajero (al registrarse se crea su pasajero)
Usuario.hasOne(Pasajero, { foreignKey: "id_usuario" });
Pasajero.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Aeropuerto → Rutas
Aeropuerto.hasMany(Ruta, { foreignKey: "id_origen", as: "rutasOrigen" });
Aeropuerto.hasMany(Ruta, { foreignKey: "id_destino", as: "rutasDestino" });
Ruta.belongsTo(Aeropuerto, { foreignKey: "id_origen", as: "origen" });
Ruta.belongsTo(Aeropuerto, { foreignKey: "id_destino", as: "destino" });

// Ruta → Vuelos
Ruta.hasMany(Vuelo, { foreignKey: "id_ruta" });
Vuelo.belongsTo(Ruta, { foreignKey: "id_ruta", as: "Ruta" });


// Avion → Vuelos
Avion.hasMany(Vuelo, { foreignKey: "id_avion" });
Vuelo.belongsTo(Avion, { foreignKey: "id_avion" });

// Avion → Asientos
Avion.hasMany(Asiento, { foreignKey: "id_avion" });
Asiento.belongsTo(Avion, { foreignKey: "id_avion" });

// Vuelo ↔ Asiento (N:M)
Vuelo.belongsToMany(Asiento, { through: VueloAsiento, foreignKey: "id_vuelo" });
Asiento.belongsToMany(Vuelo, {
  through: VueloAsiento,
  foreignKey: "id_asiento",
});

// Pasajero → GrupoReserva
Pasajero.hasMany(GrupoReserva, { foreignKey: "id_pasajero_responsable" });
GrupoReserva.belongsTo(Pasajero, { foreignKey: "id_pasajero_responsable" });

// GrupoReserva → Pagos
GrupoReserva.hasMany(Pago, { foreignKey: "id_grupo" });
Pago.belongsTo(GrupoReserva, { foreignKey: "id_grupo" });

// GrupoReserva → Reservas
GrupoReserva.hasMany(Reserva, { foreignKey: "id_grupo" });
Reserva.belongsTo(GrupoReserva, { foreignKey: "id_grupo" });

// Pasajero → Reservas
Pasajero.hasMany(Reserva, { foreignKey: "id_pasajero" });
Reserva.belongsTo(Pasajero, { foreignKey: "id_pasajero" });

// Vuelo → Reservas
Vuelo.hasMany(Reserva, { foreignKey: "id_vuelo" });
Reserva.belongsTo(Vuelo, { foreignKey: "id_vuelo" });

// Reserva ↔ Asiento (N:M)
Reserva.belongsToMany(Asiento, {
  through: ReservaAsiento,
  foreignKey: "id_reserva",
});
Asiento.belongsToMany(Reserva, {
  through: ReservaAsiento,
  foreignKey: "id_asiento",
});

// Vuelo ↔ Tripulacion (N:M)
Vuelo.belongsToMany(Tripulacion, {
  through: VueloTripulacion,
  foreignKey: "id_vuelo",
});
Tripulacion.belongsToMany(Vuelo, {
  through: VueloTripulacion,
  foreignKey: "id_tripulacion",
});

// ────────────────────────────────────────────────────────

module.exports = {
  sequelize,
  Usuario,
  Pasajero,
  Aeropuerto,
  Ruta,
  Avion,
  Vuelo,
  Asiento,
  VueloAsiento,
  GrupoReserva,
  Pago,
  Reserva,
  ReservaAsiento,
  Tripulacion,
  VueloTripulacion,
};
