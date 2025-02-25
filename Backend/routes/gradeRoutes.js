import express from 'express';
import { createGrade, getGrades, getGradeById, updateGrade, deleteGrade } from '../controllers/gradeController.js';

const router = express.Router();

router.post('/', createGrade);
router.get('/', getGrades);
router.get('/:id', getGradeById);
router.put('/:id', updateGrade);
router.delete('/:id', deleteGrade);

export default router;