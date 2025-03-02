import EvaluationPlan from '../models/EvaluationPlan.js';

// Crear un nuevo plan de evaluación
export const createEvaluationPlan = async (req, res) => {
  try {
    const newEvaluationPlan = new EvaluationPlan(req.body);
    await newEvaluationPlan.save();
    res.status(201).json(newEvaluationPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los planes de evaluación
export const getEvaluationPlans = async (req, res) => {
  try {
    const evaluationPlans = await EvaluationPlan.find();
    res.status(200).json(evaluationPlans);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Obtener un plan de evaluación por ID
export const getEvaluationPlanById = async (req, res) => {
  try {
    const evaluationPlan = await EvaluationPlan.findById(req.params.id);
    if (!evaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado' });
    }
    res.status(200).json(evaluationPlan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar un plan de evaluación por ID
export const updateEvaluationPlan = async (req, res) => {
  try {
    const updatedEvaluationPlan = await EvaluationPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado' });
    }
    res.status(200).json(updatedEvaluationPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un plan de evaluación por ID
export const deleteEvaluationPlan = async (req, res) => {
  try {
    const deletedEvaluationPlan = await EvaluationPlan.findByIdAndDelete(req.params.id);
    if (!deletedEvaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado' });
    }
    res.status(200).json({ message: 'Plan de evaluación eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};