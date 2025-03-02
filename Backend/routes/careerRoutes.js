// routes/careerRoutes.js
import express from 'express';
import {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController.js';

const router = express.Router();

router.post('/', createCareer);
router.get('/', getCareers);
router.get('/:id', getCareerById);
router.put('/:id', updateCareer);
router.delete('/:id', deleteCareer);

export default router;