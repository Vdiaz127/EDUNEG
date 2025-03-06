import EvaluationPlan from '../models/EvaluationPlan.js';
import Evaluation from '../models/Evaluation.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';

export const createEvaluationPlan = async (req, res) => {
  try {
      const { description, assignments, sectionId } = req.body;

      // Validar que la sección exista
      const section = await Section.findById(sectionId).populate('semesterId').populate('subjectId');
      if (!section) {
          return res.status(404).json({ message: 'Sección no encontrada.' });
      }

      // Validar que el semestre esté "en curso"
      if (!section.semesterId || section.semesterId.status !== 'en curso') {
          return res.status(400).json({ message: 'Solo se puede crear un plan de evaluación en semestres en curso.' });
      }

      // Validar que la suma de los pesos sea exactamente 100%
      const totalWeight = assignments.reduce((sum, assignment) => {
          return sum + Number(assignment.weight || 0);
      }, 0);

      if (totalWeight !== 100) {
          return res.status(400).json({ 
              message: `La suma de los pesos debe ser exactamente 100%. Actual: ${totalWeight}%` 
          });
      }

      // Generar el nombre del plan de evaluación
      const subjectCode = section.subjectId.acronym || section.subjectId.name.substring(0, 3).toUpperCase();
      const sectionNumber = section.sectionNumber;
      const semesterPeriod = section.semesterId.periodo;
      const semesterYear = section.semesterId.año;

      const evaluationPlanName = `${subjectCode}-${sectionNumber}-${semesterPeriod}-${semesterYear}`;

      // Obtener las fechas de inicio y fin del semestre
      const startDate = section.semesterId.fechaInicio;
      const endDate = section.semesterId.fechaFin;

      // Crear el plan de evaluación
      const evaluationPlan = new EvaluationPlan({
          name: evaluationPlanName,
          description,
          startDate,
          endDate,
          sectionId,
          status: 'active',
          isLocked: true // Bloquear el plan de evaluación
      });

      await evaluationPlan.save();

      // Crear las evaluaciones asociadas al plan
      for (const assignment of assignments) {
          const evaluation = new Evaluation({
              name: assignment.title,
              dueDate: assignment.date,
              weight: assignment.weight,
              evaluationPlanId: evaluationPlan._id,
              status: 'Pendiente'
          });

          await evaluation.save();
      }

      res.status(201).json({ message: 'Plan de evaluación creado exitosamente', evaluationPlan });
  } catch (error) {
      console.error('Error al crear plan de evaluación:', error);
      res.status(500).json({ message: 'Error al crear el plan de evaluación', error: error.message });
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

export const getEvaluationPlansBySection = async (req, res) => {
  try {
    const { sectionId } = req.query; // Obtener el sectionId de la query

    // Buscar el plan de evaluación por sectionId
    const evaluationPlan = await EvaluationPlan.findOne({ sectionId: sectionId });

    if (evaluationPlan) {
      res.status(200).json([evaluationPlan]); // Devolver el plan de evaluación si existe
    } else {
      res.status(200).json([]); // Devolver un array vacío si no existe
    }
  } catch (error) {
    console.error('Error al obtener el plan de evaluación:', error);
    res.status(500).json({ message: 'Error al obtener el plan de evaluación', error: error.message });
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

export const updateEvaluationPlan = async (req, res) => {
  try {
      const evaluationPlan = await EvaluationPlan.findById(req.params.id);

      if (evaluationPlan.isLocked) {
          return res.status(400).json({ message: 'El plan de evaluación está bloqueado y no se puede modificar.' });
      }

      // Lógica para actualizar el plan de evaluación
  } catch (error) {
      console.error('Error al actualizar plan de evaluación:', error);
      res.status(500).json({ message: 'Error al actualizar el plan de evaluación', error: error.message });
  }
};

export const deleteEvaluationPlan = async (req, res) => {
  try {
      const evaluationPlan = await EvaluationPlan.findById(req.params.id);

      if (evaluationPlan.isLocked) {
          return res.status(400).json({ message: 'El plan de evaluación está bloqueado y no se puede eliminar.' });
      }

      // Lógica para eliminar el plan de evaluación
  } catch (error) {
      console.error('Error al eliminar plan de evaluación:', error);
      res.status(500).json({ message: 'Error al eliminar el plan de evaluación', error: error.message });
  }
};
