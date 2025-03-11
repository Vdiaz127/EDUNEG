import express from 'express';
import {
  registerUser,
  loginUser,
  authenticateToken,
  validateEmail,
  createPassword,
  validateToken,
} from '../controllers/authController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para autenticar usuario
router.post('/authenticate', authenticateToken);

// Ruta para validar el correo (Primer Login)
router.post('/validate-email', validateEmail);

// Ruta para crear la contraseña (Primer Login)
router.post('/create-password', createPassword);

// Ruta para crear la contraseña (Primer Login)
router.get('/validate-token', validateToken);
export default router;