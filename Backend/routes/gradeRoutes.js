import express from 'express';
import { 
  createGrade, 
  getGrades, 
  getGradeById, 
  updateGrade, 
  deleteGrade,
  downloadGradeFile, // Nueva función
  deleteGradeFile,  // Nueva función
  GradeTask,
} from '../controllers/gradeController.js';

const router = express.Router();

router.post('/', createGrade);
router.get('/', getGrades);
router.get('/:id', getGradeById);
router.put('/:id', updateGrade);
router.delete('/:id', deleteGrade);

// Nueva ruta para descargar el archivo de la tarea
router.get('/:id/download', downloadGradeFile);

// Nueva ruta para eliminar el archivo de la tarea
router.delete('/:id/delete-file', deleteGrade);

router.post('/grade/:gradeId', GradeTask);
export default router;