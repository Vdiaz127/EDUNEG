import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import EvaluationPlan from '../models/EvaluationPlan.js';
import Evaluation from '../models/Evaluation.js';
import Section from '../models/Section.js';
import Grade from '../models/Grade.js';
import User from '../models/User.js';

export const generateActaCierre = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener el plan de evaluación
    const evaluationPlan = await EvaluationPlan.findById(id)
      .populate('sectionId')
      .populate({
        path: 'sectionId',
        populate: [
          { path: 'subjectId', select: 'name' },
          { path: 'semesterId', select: 'periodo año' },
          { path: 'profesorId', select: 'firstName lastName' },
        ],
      });

    if (!evaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado.' });
    }

    // Obtener las evaluaciones del plan
    const evaluations = await Evaluation.find({ id });

    // Obtener los estudiantes de la sección
    const students = await User.find({ _id: { $in: evaluationPlan.sectionId.arrayStudents } });

    // Obtener las calificaciones de los estudiantes
    const grades = await Grade.find({ evaluationId: { $in: evaluations.map((e) => e._id) } });

    // Crear el PDF
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text(`Acta de Cierre - ${evaluationPlan.name}`, 10, 10);

    // Datos de la sección
    doc.setFontSize(12);
    doc.text(`Materia: ${evaluationPlan.sectionId.subjectId.name}`, 10, 20);
    doc.text(`Código de la sección: ${evaluationPlan.sectionId.sectionNumber}`, 10, 30);
    doc.text(`Semestre: ${evaluationPlan.sectionId.semesterId.periodo} ${evaluationPlan.sectionId.semesterId.año}`, 10, 40);
    doc.text(`Profesor: ${evaluationPlan.sectionId.profesorId.firstName} ${evaluationPlan.sectionId.profesorId.lastName}`, 10, 50);

    // Datos del plan de evaluación
    doc.text(`Plan de Evaluación: ${evaluationPlan.name}`, 10, 60);
    doc.text(`Fecha de inicio: ${new Date(evaluationPlan.startDate).toLocaleDateString()}`, 10, 70);
    doc.text(`Fecha de fin: ${new Date(evaluationPlan.endDate).toLocaleDateString()}`, 10, 80);

    // Detalles de las evaluaciones
    doc.setFontSize(14);
    doc.text('Evaluaciones:', 10, 90);
    evaluations.forEach((evaluation, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${evaluation.name} (${evaluation.weight}%) - Fecha de entrega: ${new Date(evaluation.dueDate).toLocaleDateString()}`,
        15,
        100 + index * 10
      );
    });

    // Tabla de calificaciones de los estudiantes
    doc.setFontSize(14);
    doc.text('Calificaciones de los Estudiantes:', 10, 100 + evaluations.length * 10);

    // Crear la tabla con el nombre de la evaluación y la nota
    const headers = ['Estudiante', ...evaluations.map((e) => e.name), 'Total'];

    const data = students.map((student) => {
      const studentGrades = evaluations.map((evaluation) => {
        const grade = grades.find((g) => {
          if (!g.evaluationId || !g.studentId) {
            console.warn("Grade sin evaluationId o studentId:", g);
            return false;
          }
    res.status(500).json(g);
          
          const gradeEvaluationId =
            typeof g.evaluationId === 'object' ? g.evaluationId._id.toString() : g.evaluationId.toString();
          const gradeStudentId =
            typeof g.studentId === 'object' ? g.studentId._id.toString() : g.studentId.toString();
          const currentEvaluationId = evaluation._id.toString();
          const currentStudentId = student._id.toString();
      
          console.log("Comparando:", {
            gradeEvaluationId,
            currentEvaluationId,
            gradeStudentId,
            currentStudentId,
          });
      
          return (
            gradeEvaluationId === currentEvaluationId &&
            gradeStudentId === currentStudentId
          );
        });
      
        res.status(200).json({ grade });
        
        return grade ? grade.score : 0; // Solo asignar 0 si no se encuentra la calificación
      });

      const total = studentGrades.reduce((sum, score) => sum + score, 0);
      return [`${student.firstName} ${student.lastName}`, ...studentGrades, total];
    });

    // Agregar la tabla usando autoTable
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 110 + evaluations.length * 10,
    });

    // Espacio para firma y sello
    doc.setFontSize(12);
    //doc.text('Firma del Profesor: ___________________________', 10, doc.autoTable.previous.finalY + 20);
    //doc.text('Sello de la Institución: ________________________', 10, doc.autoTable.previous.finalY + 30);

    // Convertir el PDF a base64
    const pdfBase64 = doc.output('datauristring');

    // Enviar el PDF como respuesta
    res.status(200).json({ pdf: pdfBase64 });
  } catch (error) {
    console.error('Error al generar el acta de cierre:', error);
    res.status(500).json({ message: 'Error al generar el acta de cierre', error: error.message });
  }
};

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

export const closeEvaluationPlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener el plan de evaluación
    const evaluationPlan = await EvaluationPlan.findById(id);
    if (!evaluationPlan) {
      return res.status(404).json({ message: 'Plan de evaluación no encontrado.' });
    }

    // Verificar que el plan no esté ya cerrado
    if (evaluationPlan.status === 'completed') {
      return res.status(400).json({ message: 'El plan de evaluación ya está cerrado.' });
    }

    // Obtener todas las evaluaciones del plan
    const evaluations = await Evaluation.find({ evaluationPlanId: id });

    // Obtener todos los estudiantes de la sección
    const section = await Section.findById(evaluationPlan.sectionId);
    const students = section.arrayStudents;

    // Verificar tareas no entregadas y asignar calificación 0
    let ungradedTasks = [];
    for (const evaluation of evaluations) {
      for (const studentId of students) {
        const grade = await Grade.findOne({ evaluationId: evaluation._id, studentId });

        if (!grade || grade.status !== 'Calificado') {
          // Si no hay entrega o no está calificada, asignar 0 y estado "Calificado"
          await Grade.findOneAndUpdate(
            { evaluationId: evaluation._id, studentId },
            { score: 0, status: 'Calificado' },
            { upsert: true, new: true }
          );

          // Agregar a la lista de tareas no entregadas
          const student = await User.findById(studentId);
          ungradedTasks.push({
            student: `${student.firstName} ${student.lastName}`,
            evaluation: evaluation.name,
          });
        }
      }
    }

    // Cambiar el estado del plan de evaluación a "completed"
    evaluationPlan.status = 'completed';
    await evaluationPlan.save();

    // Devolver la lista de tareas no entregadas
    res.status(200).json({
      message: 'Sección cerrada exitosamente. Se asignó calificación 0 a las tareas no entregadas.',
      ungradedTasks,
    });
  } catch (error) {
    console.error('Error al cerrar la sección:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};