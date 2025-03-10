import express from 'express';
import {
  createEvaluationPlan,
  getEvaluationPlans,
  getEvaluationPlanById,
  updateEvaluationPlan,
  deleteEvaluationPlan,
  getEvaluationPlansBySection,
  closeEvaluationPlan, // Importa la función
  generateActaCierre,
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
router.post('/:id/close-section', closeEvaluationPlan);
// Nueva ruta para generar el acta de cierre
router.get('/:id/generate-acta-cierre', generateActaCierre);

export default router;