import Evaluation from '../models/Evaluation.js';
import Grade from '../models/Grade.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';
import User from '../models/User.js';
import EvaluationPlan from '../models/EvaluationPlan.js';

// Crear una nueva evaluación
export const createEvaluation = async (req, res) => {
  try {
    const newEvaluation = new Evaluation(req.body);
    await newEvaluation.save();
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las evaluaciones
export const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Obtener una evaluación por ID
export const getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluación no encontrada' });
    }
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar una evaluación por ID
export const updateEvaluation = async (req, res) => {
  try {
    const updatedEvaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvaluation) {
      return res.status(404).json({ message: 'Evaluación no encontrada' });
    }
    res.status(200).json(updatedEvaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una evaluación por ID
export const deleteEvaluation = async (req, res) => {
  try {
    const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!deletedEvaluation) {
      return res.status(404).json({ message: 'Evaluación no encontrada' });
    }
    res.status(200).json({ message: 'Evaluación eliminada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener el número de evaluaciones pendientes en una sección
export const getPendingEvaluationsCount = async (req, res) => {
  try {
    const { id } = req.params;

    const evaluations = await Evaluation.find({ evaluationPlanId: id, status: 'Pendiente' });
    const pendingEvaluationsCount = evaluations.length;

    res.status(200).json({ pendingEvaluationsCount });
  } catch (error) {
    console.error('Error al obtener las evaluaciones pendientes:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener las evaluaciones con el estado calculado para un estudiante
export const getEvaluationsWithStatus = async (req, res) => {
  try {
    const { sectionId, studentId } = req.params;

    // Obtener la sección
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada.' });
    }

    // Obtener la materia
    const materia = await Subject.findById(section.subjectId);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }

    // Obtener el profesor
    const profesor = await User.findById(section.profesorId);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado.' });
    }

    // Obtener el plan de evaluación de la sección
    const evaluationPlan = await EvaluationPlan.findOne({ sectionId });
    if (!evaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado.' });
    }

    // Obtener las evaluaciones del plan de evaluación
    const evaluations = await Evaluation.find({ evaluationPlanId: evaluationPlan._id });

    // Obtener las calificaciones del estudiante para estas evaluaciones
    const grades = await Grade.find({ studentId });

    // Calcular el estado de cada evaluación
    const evaluationsWithStatus = evaluations.map((evaluation) => {
      const grade = grades.find((g) => g.evaluationId.toString() === evaluation._id.toString());
      const fechaEntrega = new Date(evaluation.dueDate);
      const fechaActual = new Date();

      let estadoTarea;
      if (evaluation.status === "Creada") {
        estadoTarea = "No disponible para entregar";
      } else if (evaluation.status === "Disponible" && !grade) {
        estadoTarea = "Por entregar";
      } else if (evaluation.status === "Disponible" && grade) {
        estadoTarea = "Entregada";
      } else if (evaluation.status === "Cerrada" && !grade) {
        estadoTarea = "No entregada (cerrada)";
      } else if (evaluation.status === "Cerrada" && grade) {
        estadoTarea = "Entregada (cerrada)";
      }

      return {
        ...evaluation.toObject(),
        estadoTarea,
        fechaEntrega: fechaEntrega.toLocaleDateString(),
        grade: grade || null,
      };
    });

    res.status(200).json({
      materia: {
        name: materia.name,
        acronym: materia.acronym,
      },
      profesor: {
        firstName: profesor.firstName,
        lastName: profesor.lastName,
      },
      evaluationPlan: {
        name: evaluationPlan.name,
      },
      evaluations: evaluationsWithStatus,
    });
  } catch (error) {
    console.error('Error al obtener las evaluaciones con estado:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
// Obtener evaluaciones de un plan de evaluación específico
export const getEvaluationsByPlan = async (req, res) => {
  try {
    const { evaluationPlanId } = req.params; // Obtener el evaluationPlanId de los parámetros

    // Buscar las evaluaciones asociadas al plan de evaluación
    const evaluations = await Evaluation.find({ evaluationPlanId });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'No se encontraron evaluaciones para este plan.' });
    }

    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error al obtener las evaluaciones:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
