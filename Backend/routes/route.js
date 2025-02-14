import express from 'express';
import { register, login, getUser  } from '../controllers/authController.js'; // Use import for named exports
import authMiddleware from '../middleware/authMiddleware.js'; // Use import for default export

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authMiddleware, getUser );

export default router;