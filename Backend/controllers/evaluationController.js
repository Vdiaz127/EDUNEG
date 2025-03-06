import Evaluation from '../models/Evaluation.js';

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