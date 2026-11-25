// Rutas de Aeropuertos — consulta y ABCC
// Principio SOLID - Single Responsibility: solo define rutas de aeropuertos
// Patron de diseño - Chain of Responsibility: verificarSesion protege cada ruta
// Clean Code: rutas claras con metodos HTTP correctos
const express = require("express");
const router = express.Router();
const { Aeropuerto } = require("../models/index");
const { verificarSesion } = require("../middlewares/auth");

// GET /api/aeropuertos — obtener todos los aeropuertos
router.get("/", verificarSesion, async (req, res) => {
  try {
    const aeropuertos = await Aeropuerto.findAll();
    res.json(aeropuertos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener aeropuertos." });
  }
});

// POST /api/aeropuertos — crear un aeropuerto
router.post("/", verificarSesion, async (req, res) => {
  try {
    const { codigo_iata, nombre, ciudad, pais } = req.body;
    if (!codigo_iata || !nombre || !ciudad || !pais) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }
    const existe = await Aeropuerto.findOne({ where: { codigo_iata } });
    if (existe)
      return res.status(400).json({ message: "El código IATA ya existe." });
    const nuevo = await Aeropuerto.create({
      codigo_iata,
      nombre,
      ciudad,
      pais,
    });
    res
      .status(201)
      .json({ message: "Aeropuerto creado correctamente.", aeropuerto: nuevo });
  } catch (error) {
    res.status(500).json({ message: "Error al crear aeropuerto." });
  }
});

// PUT /api/aeropuertos/:id — actualizar un aeropuerto
router.put("/:id", verificarSesion, async (req, res) => {
  try {
    const aeropuerto = await Aeropuerto.findByPk(req.params.id);
    if (!aeropuerto)
      return res.status(404).json({ message: "Aeropuerto no encontrado." });
    const { codigo_iata, nombre, ciudad, pais } = req.body;
    await aeropuerto.update({ codigo_iata, nombre, ciudad, pais });
    res.json({ message: "Aeropuerto actualizado correctamente.", aeropuerto });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar aeropuerto." });
  }
});

// DELETE /api/aeropuertos/:id — eliminar un aeropuerto
router.delete("/:id", verificarSesion, async (req, res) => {
  try {
    const aeropuerto = await Aeropuerto.findByPk(req.params.id);
    if (!aeropuerto)
      return res.status(404).json({ message: "Aeropuerto no encontrado." });
    const { Ruta } = require("../models/index");
    const rutasAsignadas = await Ruta.count({
      where: {
        [require("sequelize").Op.or]: [
          { id_origen: req.params.id },
          { id_destino: req.params.id },
        ],
      },
    });
    if (rutasAsignadas > 0) {
      return res
        .status(400)
        .json({
          message: `Este aeropuerto tiene ${rutasAsignadas} ruta(s) asignada(s). Elimínalas primero.`,
        });
    }
    await aeropuerto.destroy();
    res.json({ message: "Aeropuerto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar aeropuerto." });
  }
});

module.exports = router;
