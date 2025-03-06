import express from 'express';
import {
    getAllProfessors,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    getProfessorDetails,
} from '../controllers/professorController.js';

const router = express.Router();

// Rutas para profesores
router.get('/', getAllProfessors);
router.get('/:id', getProfessorById);
router.post('/', createProfessor);
router.put('/:id', updateProfessor);
router.delete('/:id', deleteProfessor);

router.get('/:id/details', getProfessorDetails);

export default router;
