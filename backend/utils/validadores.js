// Utilidades de validación — valida datos en el backend antes de procesar
// Principio SOLID: Single Responsibility — solo maneja validaciones
// Principio Clean Code: funciones pequeñas con nombre descriptivo

// ─── Validar que un campo no esté vacío ───────────────────────
const noEstaVacio = (valor) =>
  valor !== undefined && valor !== null && valor.toString().trim() !== "";

// ─── Validar formato de correo ────────────────────────────────
// Solo letras o números antes del @ y dominio obligatorio
const esCorreoValido = (correo) => {
  const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
};

// ─── Validar nombre (dos palabras con mayúscula inicial) ──────
// Ej: Nombre Nombre — dos palabras separadas por un espacio
const esNombreValido = (nombre) => {
  const regex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/;
  return regex.test(nombre.trim());
};

// ─── Validar apellido (una palabra con mayúscula inicial) ─────
// Ej: Apellido — una sola palabra con mayúscula inicial
const esApellidoValido = (apellido) => {
  const regex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/;
  return regex.test(apellido.trim());
};

// ─── Validar teléfono (exactamente 10 dígitos) ────────────────
const esTelefonoValido = (telefono) => {
  const regex = /^\d{10}$/;
  return regex.test(telefono);
};

// ─── Validar pasaporte (2 letras mayúsculas + 5 o 6 números) ──
// Ej: MX12345 o MX123456
const esPasaporteValido = (pasaporte) => {
  const regex = /^[A-Z]{2}\d{5,6}$/;
  return regex.test(pasaporte);
};

// ─── Validar género ───────────────────────────────────────────
const esGeneroValido = (genero) => ["masculino", "femenino"].includes(genero);

// ─── Validar datos de registro ────────────────────────────────
const validarRegistro = (req, res, next) => {
  const {
    nombre,
    primer_apellido,
    segundo_apellido,
    correo,
    password,
    telefono,
    num_pasaporte,
    genero,
  } = req.body;

  const errores = [];

  if (!noEstaVacio(nombre)) {
    errores.push("El nombre es obligatorio.");
  } else if (!esNombreValido(nombre)) {
    errores.push(
      "El nombre debe tener dos palabras con mayúscula inicial. Ej: Nombre Nombre",
    );
  }

  if (!noEstaVacio(primer_apellido)) {
    errores.push("El primer apellido es obligatorio.");
  } else if (!esApellidoValido(primer_apellido)) {
    errores.push(
      "El primer apellido debe iniciar con mayúscula y ser una sola palabra. Ej: Apellido",
    );
  }

  if (noEstaVacio(segundo_apellido) && !esApellidoValido(segundo_apellido)) {
    errores.push(
      "El segundo apellido debe iniciar con mayúscula y ser una sola palabra. Ej: Apellido",
    );
  }

  if (!noEstaVacio(correo)) {
    errores.push("El correo es obligatorio.");
  } else if (!esCorreoValido(correo)) {
    errores.push(
      "El correo solo puede tener letras o números antes del @. Ej: usuario123@gmail.com",
    );
  }

  if (!noEstaVacio(password)) {
    errores.push("La contraseña es obligatoria.");
  } else if (password.length < 6) {
    errores.push("La contraseña debe tener al menos 6 caracteres.");
  }

  if (!noEstaVacio(telefono)) {
    errores.push("El teléfono es obligatorio.");
  } else if (!esTelefonoValido(telefono)) {
    errores.push(
      "El teléfono debe tener exactamente 10 dígitos numéricos. Ej: 4941161315",
    );
  }

  if (!noEstaVacio(num_pasaporte)) {
    errores.push("El número de pasaporte es obligatorio.");
  } else if (!esPasaporteValido(num_pasaporte)) {
    errores.push(
      "El pasaporte debe tener 2 letras mayúsculas seguidas de 5 o 6 números. Ej: MX12345",
    );
  }

  if (!noEstaVacio(genero)) {
    errores.push("El género es obligatorio.");
  } else if (!esGeneroValido(genero)) {
    errores.push("El género debe ser masculino o femenino.");
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

// ─── Validar datos de login ───────────────────────────────────
const validarLogin = (req, res, next) => {
  const { correo, password } = req.body;
  const errores = [];

  if (!noEstaVacio(correo)) {
    errores.push("El correo es obligatorio.");
  } else if (!esCorreoValido(correo)) {
    errores.push("El correo no tiene un formato válido.");
  }

  if (!noEstaVacio(password)) {
    errores.push("La contraseña es obligatoria.");
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

// ─── Validar datos de vuelo ───────────────────────────────────
const validarVuelo = (req, res, next) => {
  const { codigo_vuelo, fecha_salida, fecha_llegada, id_ruta, id_avion } =
    req.body;
  const errores = [];

  if (!noEstaVacio(codigo_vuelo))
    errores.push("El código de vuelo es obligatorio.");
  if (!noEstaVacio(fecha_salida))
    errores.push("La fecha de salida es obligatoria.");
  if (!noEstaVacio(fecha_llegada))
    errores.push("La fecha de llegada es obligatoria.");
  if (!noEstaVacio(id_ruta)) errores.push("La ruta es obligatoria.");
  if (!noEstaVacio(id_avion)) errores.push("El avión es obligatorio.");

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

// ─── Validar datos de pasajero ────────────────────────────────
const validarPasajero = (req, res, next) => {
  const { nombre, primer_apellido, correo, telefono, num_pasaporte } = req.body;
  const errores = [];

  if (!noEstaVacio(nombre)) {
    errores.push("El nombre es obligatorio.");
  } else if (!esNombreValido(nombre)) {
    errores.push(
      "El nombre debe tener dos palabras con mayúscula inicial. Ej: Nombre Nombre",
    );
  }

  if (!noEstaVacio(primer_apellido)) {
    errores.push("El primer apellido es obligatorio.");
  } else if (!esApellidoValido(primer_apellido)) {
    errores.push("El primer apellido debe iniciar con mayúscula. Ej: Apellido");
  }

  if (!noEstaVacio(correo)) {
    errores.push("El correo es obligatorio.");
  } else if (!esCorreoValido(correo)) {
    errores.push("El correo solo puede tener letras o números antes del @.");
  }

  if (!noEstaVacio(telefono)) {
    errores.push("El teléfono es obligatorio.");
  } else if (!esTelefonoValido(telefono)) {
    errores.push("El teléfono debe tener exactamente 10 dígitos numéricos.");
  }

  if (!noEstaVacio(num_pasaporte)) {
    errores.push("El número de pasaporte es obligatorio.");
  } else if (!esPasaporteValido(num_pasaporte)) {
    errores.push(
      "El pasaporte debe tener 2 letras mayúsculas seguidas de 5 o 6 números. Ej: MX12345",
    );
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

// ─── Validar datos de tripulación ─────────────────────────────
const validarTripulacion = (req, res, next) => {
  const { nombre, primer_apellido, nacionalidad, rol } = req.body;
  const errores = [];

  if (!noEstaVacio(nombre)) {
    errores.push("El nombre es obligatorio.");
  } else if (!esNombreValido(nombre)) {
    errores.push(
      "El nombre debe tener dos palabras con mayúscula inicial. Ej: Juan Carlos",
    );
  }

  if (!noEstaVacio(primer_apellido)) {
    errores.push("El primer apellido es obligatorio.");
  } else if (!esApellidoValido(primer_apellido)) {
    errores.push("El primer apellido debe iniciar con mayúscula. Ej: García");
  }

  if (!noEstaVacio(nacionalidad))
    errores.push("La nacionalidad es obligatoria.");
  if (!noEstaVacio(rol)) errores.push("El rol es obligatorio.");

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};

module.exports = {
  validarRegistro,
  validarLogin,
  validarVuelo,
  validarPasajero,
  validarTripulacion,
};
