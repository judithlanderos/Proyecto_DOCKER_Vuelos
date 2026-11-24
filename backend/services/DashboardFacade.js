// Principio SOLID - Single Responsibility: solo centraliza las consultas del dashboard
// Principio SOLID - Dependency Inversion: depende de modelos abstractos no de consultas directas
// Clean Code: metodo estatico claro, Promise.all para consultas paralelas eficientes
// Patrón de Diseño: FACADE (Estructural)
// Simplifica el acceso a múltiples modelos desde el dashboard
// En lugar de que el controlador llame a cada modelo por separado,
// el Facade centraliza toda esa lógica en un solo lugar
const { Vuelo, Pasajero, Reserva, Tripulacion } = require("../models/index");

class DashboardFacade {
  // Obtiene todas las estadísticas del dashboard en una sola llamada
  static async obtenerResumen() {
    const [
      totalVuelos,
      totalPasajeros,
      totalReservas,
      totalTripulacion,
      vuelosProgramados,
      vuelosCancelados,
      vuelosCompletados,
      reservasConfirmadas,
      reservasCanceladas,
    ] = await Promise.all([
      Vuelo.count(),
      Pasajero.count(),
      Reserva.count(),
      Tripulacion.count(),
      Vuelo.count({ where: { estado: "programado" } }),
      Vuelo.count({ where: { estado: "cancelado" } }),
      Vuelo.count({ where: { estado: "completado" } }),
      Reserva.count({ where: { estado: "confirmada" } }),
      Reserva.count({ where: { estado: "cancelada" } }),
    ]);

    return {
      totales: {
        vuelos: totalVuelos,
        pasajeros: totalPasajeros,
        reservas: totalReservas,
        tripulacion: totalTripulacion,
      },
      vuelos: {
        programados: vuelosProgramados,
        cancelados: vuelosCancelados,
        completados: vuelosCompletados,
      },
      reservas: {
        confirmadas: reservasConfirmadas,
        canceladas: reservasCanceladas,
      },
    };
  }
}

module.exports = DashboardFacade;
