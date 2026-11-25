// Principio SOLID - Open/Closed: nuevas funciones de auth se agregan sin modificar las existentes
// Principio SOLID - Dependency Inversion: depende de abstracciones (modelos) no de implementaciones
// Clean Code: funciones pequeñas con un solo proposito, nombres descriptivos
const bcrypt = require("bcryptjs");
const { Usuario, Pasajero } = require("../models/index");

// ─── Registro de usuario ─────────────────────────────────────
// Al registrarse se crea automáticamente el usuario y su pasajero
const registro = async (req, res) => {
  try {
    const {
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      password,
      telefono,
      nacionalidad,
      num_pasaporte,
      genero,
    } = req.body;

    // Verificar si el correo ya existe en BD
    const usuarioExiste = await Usuario.findOne({ where: { correo } });
    if (usuarioExiste) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Encriptar contraseña — nunca se guarda en texto plano
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario en BD
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: passwordHash,
      genero,
    });

    // Crear pasajero vinculado al usuario automáticamente
    await Pasajero.create({
      nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      nacionalidad,
      num_pasaporte,
      id_usuario: nuevoUsuario.id_usuario,
    });

    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ─── Login de usuario ─────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar usuario en BD — Sequelize evita inyección SQL
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    // Comparar contraseña con el hash almacenado
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    // Iniciar sesión — se almacena el usuario en la sesión
    req.session.usuario = {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      genero: usuario.genero, // Para el mensaje de bienvenida
    };

    res.json({ message: "Login exitoso.", usuario: req.session.usuario });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ─── Logout de usuario ────────────────────────────────────────
const logout = (req, res) => {
  // Destruir la sesión completamente al cerrar sesión
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesión." });
    }
    res.json({ message: "Sesión cerrada correctamente." });
  });
};

// ─── Verificar sesión activa ──────────────────────────────────
const verificarSesion = (req, res) => {
  if (req.session && req.session.usuario) {
    return res.json({ autenticado: true, usuario: req.session.usuario });
  }
  res.json({ autenticado: false });
};

module.exports = { registro, login, logout, verificarSesion };
