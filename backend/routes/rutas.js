// Rutas de Rutas Aéreas — ABCC completo
// Principio SOLID - Single Responsibility: solo define rutas de trayectos
// Patron de diseño - Chain of Responsibility: verificarSesion protege cada ruta
// Clean Code: rutas claras con metodos HTTP correctos por operacion
const express = require("express");
const router = express.Router();
const { Ruta, Aeropuerto, Vuelo } = require("../models/index");
const { verificarSesion } = require("../middlewares/auth");

// GET /api/rutas — obtener todas las rutas
router.get("/", verificarSesion, async (req, res) => {
  try {
    const rutas = await Ruta.findAll({
      include: [
        { model: Aeropuerto, as: "origen" },
        { model: Aeropuerto, as: "destino" },
      ],
    });
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener rutas." });
  }
});

// GET /api/rutas/:id — obtener una ruta por ID
router.get("/:id", verificarSesion, async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id, {
      include: [
        { model: Aeropuerto, as: "origen" },
        { model: Aeropuerto, as: "destino" },
      ],
    });
    if (!ruta) return res.status(404).json({ message: "Ruta no encontrada." });
    res.json(ruta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ruta." });
  }
});

// POST /api/rutas — crear una ruta
router.post("/", verificarSesion, async (req, res) => {
  try {
    const { id_origen, id_destino, distancia_km, duracion_estimada } = req.body;
    if (!id_origen || !id_destino || !distancia_km || !duracion_estimada) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }
    if (id_origen === id_destino) {
      return res
        .status(400)
        .json({ message: "El origen y destino no pueden ser iguales." });
    }
    const nuevaRuta = await Ruta.create({
      id_origen,
      id_destino,
      distancia_km,
      duracion_estimada,
    });
    res
      .status(201)
      .json({ message: "Ruta creada correctamente.", ruta: nuevaRuta });
  } catch (error) {
    res.status(500).json({ message: "Error al crear ruta." });
  }
});

// PUT /api/rutas/:id — actualizar una ruta
router.put("/:id", verificarSesion, async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (!ruta) return res.status(404).json({ message: "Ruta no encontrada." });
    const { id_origen, id_destino, distancia_km, duracion_estimada } = req.body;
    if (id_origen === id_destino) {
      return res
        .status(400)
        .json({ message: "El origen y destino no pueden ser iguales." });
    }
    const vuelosAsignados = await Vuelo.count({
      where: { id_ruta: req.params.id },
    });
    if (vuelosAsignados > 0) {
      await ruta.update({ distancia_km, duracion_estimada });
      res.json({
        message:
          "Ruta actualizada. El origen y destino no se pueden modificar porque tiene vuelos asignados.",
        ruta,
      });
    } else {
      await ruta.update({
        id_origen,
        id_destino,
        distancia_km,
        duracion_estimada,
      });
      res.json({ message: "Ruta actualizada correctamente.", ruta });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar ruta." });
  }
});

// DELETE /api/rutas/:id — eliminar una ruta
router.delete("/:id", verificarSesion, async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (!ruta) return res.status(404).json({ message: "Ruta no encontrada." });
    const vuelosAsignados = await Vuelo.count({
      where: { id_ruta: req.params.id },
    });
    if (vuelosAsignados > 0) {
      return res
        .status(400)
        .json({
          message: `Esta ruta tiene ${vuelosAsignados} vuelo(s) asignado(s). Elimínalos primero.`,
        });
    }
    await ruta.destroy();
    res.json({ message: "Ruta eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ruta." });
  }
});

module.exports = router;
