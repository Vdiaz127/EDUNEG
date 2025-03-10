import express from 'express';
import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
  addStudentToSection,
  removeStudentFromSection,
  isStudentInSection,
  getSubjectIdsByStudentId,
  getSubjectIdsByProfessorId,
  getSectionsBySubjectId,
  getStudentCount,
  getStudentsBySectionId, // Nueva función
} from '../controllers/sectionController.js';

const router = express.Router();

// Rutas CRUD para Section
router.post('/', createSection);
router.get('/', getSections);
router.get('/:id', getSectionById);
router.put('/:id', updateSection);
router.delete('/:id', deleteSection);

// Nueva ruta para obtener estudiantes de una sección
router.get('/:id/students', getStudentsBySectionId); // Agrega esta línea

// Rutas adicionales para manejar estudiantes en secciones
router.post('/add-student', addStudentToSection);
router.post('/remove-student', removeStudentFromSection);
router.post('/is-student-in-section', isStudentInSection);

// Rutas para obtener IDs de materias
router.get('/student/:studentId/subject-ids', getSubjectIdsByStudentId);
router.get('/professor/:professorId/subject-ids', getSubjectIdsByProfessorId);
router.get('/subject/:subjectId/sections', getSectionsBySubjectId);

// Nueva ruta para obtener el número de estudiantes en una sección
router.get('/:id/student-count', getStudentCount);

export default router;