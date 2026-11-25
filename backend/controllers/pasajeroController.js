// Controlador de Pasajeros — maneja el ABCC completo
// Principio SOLID: Single Responsibility — solo maneja lógica de pasajeros
// Principio SOLID - Open/Closed: nuevas operaciones se agregan sin modificar las existentes
// Principio SOLID - Liskov Substitution: cada funcion puede sustituirse sin afectar el sistema
// Patron de diseño - Repository: abstrae el acceso a datos de pasajeros mediante Sequelize
// Clean Code: funciones pequeñas con un solo proposito, validaciones claras antes de operar
const { Pasajero } = require("../models/index");

// ─── Obtener todos los pasajeros ──────────────────────────────
const obtenerPasajeros = async (req, res) => {
  try {
    const pasajeros = await Pasajero.findAll();
    res.json(pasajeros);
  } catch (error) {
    console.error("Error al obtener pasajeros:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ─── Obtener un pasajero por ID ───────────────────────────────
const obtenerPasajeroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pasajero = await Pasajero.findByPk(id);
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado." });
    }
    res.json(pasajero);
  } catch (error) {
    console.error("Error al obtener pasajero:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ─── Crear un pasajero ────────────────────────────────────────
const crearPasajero = async (req, res) => {
  try {
    const {
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      nacionalidad,
      num_pasaporte,
    } = req.body;

    // Verificar que el correo no exista
    const existe = await Pasajero.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const nuevoPasajero = await Pasajero.create({
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      nacionalidad,
      num_pasaporte,
    });

    res
      .status(201)
      .json({
        message: "Pasajero creado correctamente.",
        pasajero: nuevoPasajero,
      });
  } catch (error) {
    console.error("Error al crear pasajero:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ─── Actualizar un pasajero ───────────────────────────────────
const actualizarPasajero = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      nacionalidad,
      num_pasaporte,
    } = req.body;

    const pasajero = await Pasajero.findByPk(id);
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado." });
    }

    await pasajero.update({
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      nacionalidad,
      num_pasaporte,
    });

    res.json({ message: "Pasajero actualizado correctamente.", pasajero });
  } catch (error) {
    console.error("Error al actualizar pasajero:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ─── Eliminar un pasajero ─────────────────────────────────────
const eliminarPasajero = async (req, res) => {
  try {
    const { id } = req.params;
    const pasajero = await Pasajero.findByPk(id);
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado." });
    }

    await pasajero.destroy();
    res.json({ message: "Pasajero eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar pasajero:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  obtenerPasajeros,
  obtenerPasajeroPorId,
  crearPasajero,
  actualizarPasajero,
  eliminarPasajero,
};
