// Servicio centralizado de API — todas las peticiones al backend pasan por aquí
// Principio SOLID: Single Responsibility — solo maneja comunicación con el backend
// Clean Code: nombres descriptivos y funciones pequeñas
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Configuración base — envía cookies de sesión en cada petición
axios.defaults.withCredentials = true;

// ─── Auth ─────────────────────────────────────────────────────
export const loginUsuario = (datos) =>
  axios.post(`${API_URL}/api/auth/login`, datos);

export const registroUsuario = (datos) =>
  axios.post(`${API_URL}/api/auth/registro`, datos);

export const logoutUsuario = () => axios.post(`${API_URL}/api/auth/logout`);

export const verificarSesion = () => axios.get(`${API_URL}/api/auth/sesion`);

// ─── Dashboard ────────────────────────────────────────────────
export const getEstadisticas = () => axios.get(`${API_URL}/api/dashboard`);

// ─── Vuelos ───────────────────────────────────────────────────
export const getVuelos = () => axios.get(`${API_URL}/api/vuelos`);

export const getVueloPorId = (id) => axios.get(`${API_URL}/api/vuelos/${id}`);

export const crearVuelo = (datos) => axios.post(`${API_URL}/api/vuelos`, datos);

export const actualizarVuelo = (id, datos) =>
  axios.put(`${API_URL}/api/vuelos/${id}`, datos);

export const cancelarVuelo = (id) =>
  axios.patch(`${API_URL}/api/vuelos/${id}/cancelar`);

export const eliminarVuelo = (id) =>
  axios.delete(`${API_URL}/api/vuelos/${id}`);

// ─── Pasajeros ────────────────────────────────────────────────
export const getPasajeros = () => axios.get(`${API_URL}/api/pasajeros`);

export const getPasajeroPorId = (id) =>
  axios.get(`${API_URL}/api/pasajeros/${id}`);

export const crearPasajero = (datos) =>
  axios.post(`${API_URL}/api/pasajeros`, datos);

export const actualizarPasajero = (id, datos) =>
  axios.put(`${API_URL}/api/pasajeros/${id}`, datos);

export const eliminarPasajero = (id) =>
  axios.delete(`${API_URL}/api/pasajeros/${id}`);

// ─── Reservas ─────────────────────────────────────────────────
export const getReservas = () => axios.get(`${API_URL}/api/reservas`);

export const getReservaPorId = (id) =>
  axios.get(`${API_URL}/api/reservas/${id}`);

export const crearReserva = (datos) =>
  axios.post(`${API_URL}/api/reservas`, datos);

export const actualizarReserva = (id, datos) =>
  axios.put(`${API_URL}/api/reservas/${id}`, datos);

export const cancelarReserva = (id) =>
  axios.patch(`${API_URL}/api/reservas/${id}/cancelar`);

export const eliminarReserva = (id) =>
  axios.delete(`${API_URL}/api/reservas/${id}`);

// ─── Tripulación ──────────────────────────────────────────────
export const getTripulacion = () => axios.get(`${API_URL}/api/tripulacion`);

export const getTripulacionPorId = (id) =>
  axios.get(`${API_URL}/api/tripulacion/${id}`);

export const crearTripulacion = (datos) =>
  axios.post(`${API_URL}/api/tripulacion`, datos);

export const actualizarTripulacion = (id, datos) =>
  axios.put(`${API_URL}/api/tripulacion/${id}`, datos);

export const eliminarTripulacion = (id) =>
  axios.delete(`${API_URL}/api/tripulacion/${id}`);
