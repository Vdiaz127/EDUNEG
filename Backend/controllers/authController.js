import User from '../models/User.js'; // Use import instead of require
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Registrar un nuevo usuario
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(400).send({ error: 'Registro fallido', details: err });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Inicio de sesión fallido', details: err });
  }
};

// Obtener información del usuario
const getUser  = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Error al obtener la información del usuario', details: err });
  }
};

export { register, login, getUser  }; // Use named exports instead of module.exports