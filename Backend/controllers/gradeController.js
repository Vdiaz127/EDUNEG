import Grade from '../models/Grade.js';
import Evaluation from '../models/Evaluation.js';
import Section from '../models/Section.js';

// Crear un Grade cuando un estudiante entrega una tarea
export const createGrade = async (req, res) => {
  try {
      const { evaluationId, studentId, fileUrl, comments } = req.body;

      // Validar que la evaluación exista
      const evaluation = await Evaluation.findById(evaluationId);
      if (!evaluation) {
          return res.status(404).json({ message: 'Evaluación no encontrada.' });
      }

      // Validar que el estudiante esté inscrito en la sección
      const section = await Section.findOne({ arrayStudents: studentId });
      if (!section) {
          return res.status(400).json({ message: 'El estudiante no está inscrito en esta sección.' });
      }

      // Crear el Grade (calificación inicial sin puntuación)
      const grade = new Grade({
          evaluationId,
          studentId,
          score: 0, // Inicialmente sin calificar
          comments: comments || '', // Comentarios opcionales
          fileUrl, // URL del archivo subido por el estudiante
          status: 'Entregado' // Estado de la entrega
      });

      await grade.save();

      res.status(201).json({ message: 'Tarea entregada exitosamente', grade });
  } catch (error) {
      console.error('Error al entregar la tarea:', error);
      res.status(500).json({ message: 'Error al entregar la tarea', error: error.message });
  }
};

// Obtener todos los Grades
export const getGrades = async (req, res) => {
  try {
      const grades = await Grade.find().populate('evaluationId', 'name dueDate weight').populate('studentId', 'firstName lastName');
      res.status(200).json(grades);
  } catch (error) {
      console.error('Error al obtener los Grades:', error);
      res.status(500).json({ message: 'Error al obtener los Grades', error: error.message });
  }
};

// Obtener un Grade por ID
export const getGradeById = async (req, res) => {
  try {
      const { id } = req.params;

      const grade = await Grade.findById(id).populate('evaluationId', 'name dueDate weight').populate('studentId', 'firstName lastName');
      if (!grade) {
          return res.status(404).json({ message: 'Grade no encontrado.' });
      }

      res.status(200).json(grade);
  } catch (error) {
      console.error('Error al obtener el Grade:', error);
      res.status(500).json({ message: 'Error al obtener el Grade', error: error.message });
  }
};

// Actualizar un Grade (calificar una tarea)
export const updateGrade = async (req, res) => {
  try {
      const { id } = req.params;
      const { score, comments } = req.body;

      // Validar que el Grade exista
      const grade = await Grade.findById(id);
      if (!grade) {
          return res.status(404).json({ message: 'Grade no encontrado.' });
      }

      // Validar que la calificación esté en el rango permitido
      if (score < 0 || score > 100) {
          return res.status(400).json({ message: 'La calificación debe estar entre 0 y 100.' });
      }

      // Actualizar el Grade
      grade.score = score;
      grade.comments = comments || grade.comments;
      grade.status = 'Calificado'; // Cambiar el estado a "Calificado"

      await grade.save();

      res.status(200).json({ message: 'Grade actualizado exitosamente', grade });
  } catch (error) {
      console.error('Error al actualizar el Grade:', error);
      res.status(500).json({ message: 'Error al actualizar el Grade', error: error.message });
  }
};

// Eliminar un Grade
export const deleteGrade = async (req, res) => {
  try {
      const { id } = req.params;

      const grade = await Grade.findByIdAndDelete(id);
      if (!grade) {
          return res.status(404).json({ message: 'Grade no encontrado.' });
      }

      res.status(200).json({ message: 'Grade eliminado exitosamente' });
  } catch (error) {
      console.error('Error al eliminar el Grade:', error);
      res.status(500).json({ message: 'Error al eliminar el Grade', error: error.message });
  }
};