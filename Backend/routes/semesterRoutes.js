import express from 'express';
import {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
  changeSemesterStatus // Nueva función para cambiar el estado
} from '../controllers/semesterController.js';

const router = express.Router();

// Rutas CRUD para semestres
router.post('/', createSemester);
router.get('/', getSemesters);
router.get('/:id', getSemesterById);
router.put('/:id', updateSemester);
router.delete('/:id', deleteSemester);

// Nueva ruta para cambiar el estado del semestre
router.patch('/:id/status', changeSemesterStatus);

export default router;