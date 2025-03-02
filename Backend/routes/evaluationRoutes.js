import express from 'express';
import {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
} from '../controllers/evaluationController.js';

const router = express.Router();

// Rutas CRUD para Evaluation
router.post('/', createEvaluation);
router.get('/', getEvaluations);
router.get('/:id', getEvaluationById);
router.put('/:id', updateEvaluation);
router.delete('/:id', deleteEvaluation);

export default router;