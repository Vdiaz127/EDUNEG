import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = new User({ firstName, lastName, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Función para iniciar sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su correo
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas." });
    }

    // Verificar si el usuario no tiene contraseña (es su primer inicio de sesión)
    if (!user.password) {
      return res.status(401).json({ msg: "Debes establecer una contraseña por primera vez." });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await user.matchPassword(password); 

    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas." });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // El token expira en 1 hora
    });

    // Enviar respuesta exitosa con el token y los datos del usuario
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Middleware para validar el token
export const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado
  console.log(token);
  if (!token) {
    return res.sendStatus(401); // No autorizado
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: 'Credenciales invalidas.', valid: false }); // Prohibido
    }
    return res.status(200).json({ message: 'Credenciales validas.', valid: true });
  });
};

export const validateToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado." });
    }

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        imgUrl: user.imgUrl || "https://picsum.photos/200",
      },
    });
  } catch (error) {
    console.error("Error al validar el token:", error);
    res.status(401).json({ msg: "Token no válido." });
  }
};

// Función para validar el correo (Primer Login)
export const validateEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar al usuario por su correo
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Correo no válido." });
    }

    // Verificar si el usuario ya tiene una contraseña
    if (user.password) {
      return res.status(400).json({ msg: "Ya has establecido una contraseña anteriormente." });
    }

    // Generar un token único (puedes usar JWT)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // El token expira en 1 hora
    });

    // Enviar el token como respuesta
    res.json({ token });
  } catch (error) {
    console.error("Error en la validación del correo:", error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Función para crear la contraseña (Primer Login)
export const createPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario por su ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "Token no válido." });
    }

    // Verificar si el usuario ya tiene una contraseña
    if (user.password) {
      return res.status(400).json({ msg: "Ya has establecido una contraseña anteriormente." });
    }

    // Actualizar la contraseña del usuario
    // const salt = await bcrypt.genSalt(10);
    user.password = password;
    await user.save();

    // Enviar respuesta exitosa
    res.json({ msg: "Contraseña creada exitosamente." });
  } catch (error) {
    console.error("Error al crear la contraseña:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ msg: "Token no válido o expirado." });
    }

    res.status(500).json({ msg: "Error en el servidor." });
  }
};