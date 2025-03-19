import EvaluationPlan from '../models/EvaluationPlan.js';
import Evaluation from '../models/Evaluation.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';

export const createEvaluationPlan = async (req, res) => { 
  try {
    const { description, assignments, sectionId } = req.body;

    // Validar que la sección exista y obtener la información relacionada
    const section = await Section.findById(sectionId)
      .populate('semesterId')
      .populate('subjectId');
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada.' });
    }

    // Asegurarse de que la materia (subjectId) esté poblada correctamente
    if (!section.subjectId || !section.subjectId.name) {
      const subject = await Subject.findById(section.subjectId);
      if (!subject) {
        return res.status(404).json({ message: 'Materia no encontrada para la sección.' });
      }
      section.subjectId = subject;
    }

    // Validar que la suma de los pesos (en %) sea exactamente 100%
    const totalWeight = assignments.reduce(
      (sum, assignment) => sum + Number(assignment.weight || 0),
      0
    );
    if (totalWeight !== 100) {
      return res.status(400).json({ 
        message: `La suma de los pesos debe ser exactamente 100%. Actual: ${totalWeight}%` 
      });
    }

    // Generar el nombre del plan de evaluación de forma simple
    const evaluationPlanName = `Plan de evaluación - Sección ${section.sectionNumber}`;

    // Crear el plan de evaluación sin startDate ni endDate
    const evaluationPlan = new EvaluationPlan({
      name: evaluationPlanName,
      description,
      status: 'active',
    });
    await evaluationPlan.save();

    // Registrar las evaluaciones asociadas al plan
    for (const [index, assignment] of assignments.entries()) {
      // Asigna un nombre: si el campo title es válido (mínimo 3 caracteres), úsalo; de lo contrario, asigna un valor por defecto.
      const evaluationName = (assignment.title && assignment.title.trim().length >= 3)
        ? assignment.title.trim()
        : `Evaluación ${index + 1}`;

      const dueDate = new Date(assignment.date);
      const scaledWeight = Number(assignment.weight) / 10;
      
      console.log(`Creando evaluación ${index + 1}: ${evaluationName}, peso: ${scaledWeight}, dueDate: ${dueDate}`);

      const evaluation = new Evaluation({
        evaluationPlan: evaluationPlan._id.toString(),
        name: evaluationName,
        dueDate,
        weight: scaledWeight,
        documentLink: assignment.documentLink || ""
      });
      await evaluation.save();
    }

    res.status(201).json({ 
      message: 'Plan de evaluación creado exitosamente', 
      evaluationPlan 
    });
  } catch (error) {
    console.error('Error al crear plan de evaluación:', error);
    res.status(500).json({ 
      message: 'Error al crear el plan de evaluación', 
      error: error.message 
    });
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
      return res.status(404).json({ message: 'Plan de evaluación no encontrado.' });
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
      return res.status(404).json({ message: 'Plan de evaluación no encontrado.' });
    }
    res.status(200).json(updatedEvaluationPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvaluationPlan = async (req, res) => {
  try {
    const planId = req.params.id;
    // Eliminar el plan de evaluación
    const deletedEvaluationPlan = await EvaluationPlan.findByIdAndDelete(planId);
    if (!deletedEvaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado.' });
    }
    // Eliminar todas las evaluaciones asociadas a ese plan
    await Evaluation.deleteMany({ evaluationPlan: planId.toString() });
    res.status(200).json({ message: 'Plan de evaluación y sus evaluaciones eliminados correctamente.' });
  } catch (error) {
    console.error("Error al eliminar plan de evaluación:", error);
    res.status(400).json({ message: error.message });
  }
};
