import Usuario from '../models/usuario.model.js';
import jwt from 'jsonwebtoken';

// Función para generar token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario._id, 
      email: usuario.email, 
      role: usuario.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
};

// Registro de usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false, 
        message: 'El correo electrónico ya está registrado' 
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      password,
      role
    });

    // Guardar usuario
    await nuevoUsuario.save();

    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente' 
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el registro de usuario' 
    });
  }
};

// Inicio de sesión
export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    // Verificar contraseña
    const esPasswordCorrecto = await usuario.compararPassword(password);
    if (!esPasswordCorrecto) {
      return res.status(400).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    // Generar token
    const token = generarToken(usuario);

    res.status(200).json({ 
      success: true, 
      token, 
      role: usuario.role 
    });

  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el inicio de sesión' 
    });
  }
};