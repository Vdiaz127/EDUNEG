import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentDetails, // Importa la nueva función
} from '../controllers/studentController.js';

const router = express.Router();

// Rutas CRUD para estudiantes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

// Nueva ruta para obtener los detalles del estudiante
router.get('/:id/details', getStudentDetails);

export default router;