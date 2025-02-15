import express from 'express';
import {
  createEvaluationPlan,
  getEvaluationPlans,
  getEvaluationPlanById,
  updateEvaluationPlan,
  deleteEvaluationPlan,
} from '../controllers/evaluationPlanController.js';

const router = express.Router();

// Rutas CRUD para EvaluationPlan
router.post('/', createEvaluationPlan);
router.get('/', getEvaluationPlans);
router.get('/:id', getEvaluationPlanById);
router.put('/:id', updateEvaluationPlan);
router.delete('/:id', deleteEvaluationPlan);

export default router;