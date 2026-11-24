// Rutas de Aviones — ABCC completo
// Principio SOLID - Single Responsibility: solo define rutas de aviones
// Patron de diseño - Chain of Responsibility: verificarSesion protege cada ruta
// Clean Code: rutas claras con metodos HTTP correctos por operacion
const express = require("express");
const router = express.Router();
const { Avion } = require("../models/index");
const { verificarSesion } = require("../middlewares/auth");

// GET /api/aviones — obtener todos los aviones
router.get("/", verificarSesion, async (req, res) => {
  try {
    const aviones = await Avion.findAll();
    res.json(aviones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener aviones." });
  }
});

// GET /api/aviones/:id — obtener un avion por ID
router.get("/:id", verificarSesion, async (req, res) => {
  try {
    const avion = await Avion.findByPk(req.params.id);
    if (!avion)
      return res.status(404).json({ message: "Avión no encontrado." });
    res.json(avion);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener avión." });
  }
});

// POST /api/aviones — crear un avion
router.post("/", verificarSesion, async (req, res) => {
  try {
    const { matricula, modelo, fabricante, capacidad_total } = req.body;
    if (!matricula || !modelo || !fabricante || !capacidad_total) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }
    const existe = await Avion.findOne({ where: { matricula } });
    if (existe)
      return res.status(400).json({ message: "La matrícula ya existe." });
    const nuevoAvion = await Avion.create({
      matricula,
      modelo,
      fabricante,
      capacidad_total,
    });
    res
      .status(201)
      .json({ message: "Avión creado correctamente.", avion: nuevoAvion });
  } catch (error) {
    res.status(500).json({ message: "Error al crear avión." });
  }
});

// PUT /api/aviones/:id — actualizar un avion
router.put("/:id", verificarSesion, async (req, res) => {
  try {
    const avion = await Avion.findByPk(req.params.id);
    if (!avion)
      return res.status(404).json({ message: "Avión no encontrado." });
    const { matricula, modelo, fabricante, capacidad_total } = req.body;
    const { Vuelo } = require("../models/index");
    const vuelosAsignados = await Vuelo.count({ where: { id_avion: req.params.id } });
    if (vuelosAsignados > 0) {
      await avion.update({ modelo, fabricante, capacidad_total });
      res.json({ message: "Avión actualizado. La matrícula no se puede modificar porque tiene vuelos asignados.", avion });
    } else {
      await avion.update({ matricula, modelo, fabricante, capacidad_total });
      res.json({ message: "Avión actualizado correctamente.", avion });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar avión." });
  }
});

// DELETE /api/aviones/:id — eliminar un avion
router.delete("/:id", verificarSesion, async (req, res) => {
  try {
    const avion = await Avion.findByPk(req.params.id);
    if (!avion)
      return res.status(404).json({ message: "Avión no encontrado." });
    const { Vuelo } = require("../models/index");
    const vuelosAsignados = await Vuelo.count({ where: { id_avion: req.params.id } });
    if (vuelosAsignados > 0) {
      return res.status(400).json({ message: `Este avión tiene ${vuelosAsignados} vuelo(s) asignado(s). Reasígnalos primero.` });
    }
    await avion.destroy();
    res.json({ message: "Avión eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar avión." });
  }
});

module.exports = router;
