import express from 'express';
import { 
    createStudent, 
    getAllStudents, 
    getStudentById,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js';

const router = express.Router();

// Obtener todos los estudiantes
router.get('/', getAllStudents);

// Obtener un estudiante específico
router.get('/:id', getStudentById);

// Crear un nuevo estudiante
router.post('/', createStudent);

// Actualizar un estudiante
router.put('/:id', updateStudent);

// Eliminar un estudiante
router.delete('/:id', deleteStudent);

export default router;
