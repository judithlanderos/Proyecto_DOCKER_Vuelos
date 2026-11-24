// Principio SOLID - Open/Closed: nuevos observadores se agregan sin modificar el subject
// Principio SOLID - Single Responsibility: cada observador tiene una sola tarea
// Clean Code: clases con nombres descriptivos, metodos claros y bien definidos
// Patrón de Diseño: OBSERVER (Comportamiento)
// Notifica automáticamente cuando el estado de una reserva cambia
// Los observadores reaccionan al cambio sin que la reserva los conozca directamente

class ReservaObserver {
  constructor() {
    // Lista de observadores registrados
    this.observadores = [];
  }

  // Registrar un nuevo observador
  suscribir(observador) {
    this.observadores.push(observador);
  }

  // Eliminar un observador
  desuscribir(observador) {
    this.observadores = this.observadores.filter((obs) => obs !== observador);
  }

  // Notificar a todos los observadores cuando cambia el estado
  notificar(evento, datos) {
    this.observadores.forEach((observador) => {
      observador.actualizar(evento, datos);
    });
  }
}

// Observador concreto — registra en consola los cambios de reserva
class LogReservaObserver {
  actualizar(evento, datos) {
    console.log(`[ReservaObserver] Evento: ${evento} | Datos:`, datos);
  }
}

// Observador concreto — podría enviar notificaciones o emails
class NotificacionReservaObserver {
  actualizar(evento, datos) {
    if (evento === "cancelada") {
      console.log(
        `[Notificación] Reserva ${datos.id_reserva} cancelada — notificar al pasajero`,
      );
    }
    if (evento === "confirmada") {
      console.log(
        `[Notificación] Reserva ${datos.id_reserva} confirmada — enviar confirmación`,
      );
    }
  }
}

// Instancia global del observer con sus suscriptores registrados
const reservaObserver = new ReservaObserver();
reservaObserver.suscribir(new LogReservaObserver());
reservaObserver.suscribir(new NotificacionReservaObserver());

module.exports = { reservaObserver };
