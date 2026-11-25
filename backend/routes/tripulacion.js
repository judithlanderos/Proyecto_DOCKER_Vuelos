// Principio SOLID - Single Responsibility: este archivo solo define rutas de tripulacion
// Principio SOLID - Open/Closed: nuevas rutas se agregan sin modificar las existentes
// Patron de diseño - Chain of Responsibility: verificarSesion protege cada ruta antes del controlador
// Clean Code: rutas claras con metodos HTTP correctos por operacion ABCC
// Rutas de Tripulación — ABCC completo
// Seguridad: verificarSesion protege todas las rutas
const express = require("express");
const router = express.Router();
const {
  obtenerTripulacion,
  obtenerTripulacionPorId,
  crearTripulacion,
  actualizarTripulacion,
  eliminarTripulacion,
} = require("../controllers/tripulacionController");
const { verificarSesion } = require("../middlewares/auth");

// GET /api/tripulacion — obtener toda la tripulación
router.get("/", verificarSesion, obtenerTripulacion);

// GET /api/tripulacion/:id — obtener un miembro por ID
router.get("/:id", verificarSesion, obtenerTripulacionPorId);

// POST /api/tripulacion — crear un miembro
router.post("/", verificarSesion, crearTripulacion);

// PUT /api/tripulacion/:id — actualizar un miembro
router.put("/:id", verificarSesion, actualizarTripulacion);

// DELETE /api/tripulacion/:id — eliminar un miembro
router.delete("/:id", verificarSesion, eliminarTripulacion);

module.exports = router;
