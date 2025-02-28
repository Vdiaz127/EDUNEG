import express from 'express';
import {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester
} from '../controllers/semesterController.js';

const router = express.Router();

// Rutas CRUD para semestres
router.post('/', createSemester);
router.get('/', getSemesters); // Esta es la ruta que necesitas
router.get('/:id', getSemesterById);
router.put('/:id', updateSemester);
router.delete('/:id', deleteSemester);

export default router;