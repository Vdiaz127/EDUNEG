import express from 'express';
import {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
  getPendingEvaluationsCount, // Nueva función
} from '../controllers/evaluationController.js';

const router = express.Router();

// Rutas CRUD para Evaluation
router.post('/', createEvaluation);
router.get('/', getEvaluations);
router.get('/:id', getEvaluationById);
router.put('/:id', updateEvaluation);
router.delete('/:id', deleteEvaluation);

// Nueva ruta para obtener el número de evaluaciones pendientes en una sección
router.get('/:id/pending-evaluations', getPendingEvaluationsCount);

export default router;