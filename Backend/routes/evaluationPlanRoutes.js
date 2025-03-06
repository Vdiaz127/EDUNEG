import express from 'express';
import {
  createEvaluationPlan,
  getEvaluationPlans,
  getEvaluationPlanById,
  updateEvaluationPlan,
  deleteEvaluationPlan,
  getEvaluationPlansBySection, // Importa la función
} from '../controllers/evaluationPlanController.js';

const router = express.Router();

// Rutas CRUD para EvaluationPlan
router.post('/', createEvaluationPlan);
router.get('/', getEvaluationPlans);

// Nueva ruta para obtener el plan de evaluación por sección
router.get('/by-section', getEvaluationPlansBySection); // Mueve esta línea ANTES de /:id

// Rutas que usan :id deben estar después de rutas específicas como /by-section
router.get('/:id', getEvaluationPlanById);
router.put('/:id', updateEvaluationPlan);
router.delete('/:id', deleteEvaluationPlan);

export default router;