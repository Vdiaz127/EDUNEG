import express from 'express';
import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
  getStudentCount, // Nueva función
} from '../controllers/sectionController.js';

const router = express.Router();

// Rutas CRUD para Section
router.post('/', createSection);
router.get('/', getSections);
router.get('/:id', getSectionById);
router.put('/:id', updateSection);
router.delete('/:id', deleteSection);

// Nueva ruta para obtener el número de estudiantes en una sección
router.get('/:id/student-count', getStudentCount);

export default router;