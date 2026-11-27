// Principio SOLID - Single Responsibility: este archivo solo define rutas de vuelos
// Principio SOLID - Open/Closed: nuevas rutas se agregan sin modificar las existentes
// Patron de diseño - Chain of Responsibility: verificarSesion protege cada ruta antes del controlador
// Clean Code: rutas claras y descriptivas con metodos HTTP correctos por operacion
const express = require("express");
const router = express.Router();
const {
  obtenerVuelos,
  obtenerVueloPorId,
  crearVuelo,
  actualizarVuelo,
  cancelarVuelo,
  eliminarVuelo,
} = require("../controllers/vueloController");
const { verificarSesion } = require("../middlewares/auth");

router.get("/", verificarSesion, obtenerVuelos);
router.get("/:id", verificarSesion, obtenerVueloPorId);
router.post("/", verificarSesion, crearVuelo);
router.put("/:id", verificarSesion, actualizarVuelo);
router.patch("/:id/cancelar", verificarSesion, cancelarVuelo);
router.delete("/:id", verificarSesion, eliminarVuelo);

router.get(
  "/:id/tripulacion",
  verificarSesion,
  require("../controllers/vueloController").obtenerTripulacionVuelo,
);

router.post(
  "/:id/tripulacion",
  verificarSesion,
  require("../controllers/vueloController").asignarTripulacionVuelo,
);

router.get("/:id/asientos", verificarSesion, async (req, res) => {
  try {
    const { sequelize } = require("../models/index");
    const idVuelo = req.params.id;
    const [vuelo] = await sequelize.query(
      `SELECT id_avion FROM vuelos WHERE id_vuelo = :id`,
      { replacements: { id: idVuelo }, type: sequelize.QueryTypes.SELECT },
    );
    if (!vuelo)
      return res.status(404).json({ message: "Vuelo no encontrado." });
    const asientos = await sequelize.query(
      `SELECT a.id_asiento, a.numero_asiento, a.clase,
       COALESCE(va.estado, 'disponible') as estado
       FROM asientos a
       LEFT JOIN vuelo_asientos va ON a.id_asiento = va.id_asiento AND va.id_vuelo = :id_vuelo
       WHERE a.id_avion = :id_avion
       ORDER BY a.numero_asiento ASC`,
      {
        replacements: { id_vuelo: idVuelo, id_avion: vuelo.id_avion },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    res.json(asientos);
  } catch (error) {
    console.error("Error al obtener asientos:", error);
    res.status(500).json({ message: "Error al obtener asientos." });
  }
});

router.post("/:id/asientos/estado", verificarSesion, async (req, res) => {
  try {
    const { sequelize } = require("../models/index");
    const { id_asiento, estado } = req.body;
    const idVuelo = req.params.id;
    if (!["disponible", "bloqueado"].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido." });
    }
    await sequelize.query(
      `INSERT INTO vuelo_asientos (id_vuelo, id_asiento, estado)
       VALUES (:id_vuelo, :id_asiento, :estado)
       ON DUPLICATE KEY UPDATE estado = :estado`,
      { replacements: { id_vuelo: idVuelo, id_asiento, estado } },
    );
    res.json({ message: "Estado actualizado." });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ message: "Error al actualizar estado." });
  }
});

module.exports = router;

module.exports = router;
