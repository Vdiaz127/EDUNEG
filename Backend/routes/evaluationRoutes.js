import express from 'express';
import {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation,
  getPendingEvaluationsCount,
  getEvaluationsWithStatus,
  getEvaluationsByPlan, // Importa el nuevo método
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

// Nueva ruta para obtener las evaluaciones con estado
router.get('/:sectionId/:studentId/status', getEvaluationsWithStatus);

// Nueva ruta para obtener las evaluaciones de un plan de evaluación específico
router.get('/by-plan/:evaluationPlanId', getEvaluationsByPlan);

export default router;