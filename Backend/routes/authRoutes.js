import express from 'express';
import { registerUser, loginUser, authenticateToken } from '../controllers/authController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para autenticar ususario
router.post('/authenticate', authenticateToken);

export default router;