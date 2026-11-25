// Controlador del Dashboard — provee estadísticas generales
// Principio SOLID: Single Responsibility — solo maneja datos del dashboard
// Patrón Facade: DashboardFacade simplifica el acceso a múltiples modelos
// Principio SOLID - Open/Closed: nuevas estadisticas se agregan sin modificar las existentes
// Principio SOLID - Dependency Inversion: depende de modelos abstractos no de consultas directas
// Clean Code: variables con nombres descriptivos, logica clara y separada por entidad
const { Vuelo, Pasajero, Reserva, Tripulacion } = require("../models/index");

// ─── Obtener estadísticas generales ──────────────────────────
const obtenerEstadisticas = async (req, res) => {
  try {
    // Contar registros de cada entidad para mostrar en el dashboard
    const totalVuelos = await Vuelo.count();
    const totalPasajeros = await Pasajero.count();
    const totalReservas = await Reserva.count();
    const totalTripulacion = await Tripulacion.count();

    // Contar vuelos por estado
    const vuelosProgramados = await Vuelo.count({
      where: { estado: "programado" },
    });
    const vuelosCancelados = await Vuelo.count({
      where: { estado: "cancelado" },
    });
    const vuelosCompletados = await Vuelo.count({
      where: { estado: "completado" },
    });

    // Contar reservas por estado
    const reservasConfirmadas = await Reserva.count({
      where: { estado: "confirmada" },
    });
    const reservasCanceladas = await Reserva.count({
      where: { estado: "cancelada" },
    });

    const { Pasajero: PasajeroModel, Vuelo: VueloModel } = require("../models/index");
    const recientes = await Reserva.findAll({
      limit: 5,
      order: [['fecha_reserva', 'DESC']],
      include: [
        { model: PasajeroModel, attributes: ['nombre', 'primer_apellido'] },
        { model: VueloModel, attributes: ['codigo_vuelo'] }
      ]
    });

    const recientesFormateados = recientes.map(r => ({
      id_reserva: r.id_reserva,
      fecha_reserva: r.fecha_reserva,
      estado: r.estado,
      nombre: r.Pasajero?.nombre || '—',
      primer_apellido: r.Pasajero?.primer_apellido || '',
      codigo_vuelo: r.Vuelo?.codigo_vuelo || '—'
    }))

    res.json({
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
      recientes: recientesFormateados
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = { obtenerEstadisticas };
