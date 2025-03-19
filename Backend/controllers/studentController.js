import mongoose from 'mongoose'; // Importa mongoose para usar ObjectId
import User from '../models/User.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';
import Semester from '../models/Semester.js';
import EvaluationPlan from '../models/EvaluationPlan.js';
import Evaluation from '../models/Evaluation.js';

export const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, isActive, cedula } = req.body;

        // Verificar si la cédula ya existe
        const existingUser = await User.findOne({ cedula });
        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario con esta cédula'
            });
        }

        // Crear el estudiante
        const student = new User({
            firstName,
            lastName,
            cedula,
            isActive,
            role: 'Estudiante',
        });

        await student.save();

        res.status(201).json({
            message: 'Estudiante creado exitosamente',
            student: {
                id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                cedula: student.cedula,
                isActive: student.isActive
            }
        });
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        res.status(500).json({
            message: 'Error al crear el estudiante',
            error: error.message
        });
    }
};


export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Estudiante' })
            .select('firstName lastName email cedula isActive role');

        const formattedStudents = students.map(student => ({
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            cedula: student.cedula,
            isActive: student.isActive,
            role: student.role
        }));

        res.status(200).json(formattedStudents);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({
            message: 'Error al obtener la lista de estudiantes',
            error: error.message
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await User.findOne({ _id: req.params.id, role: 'Estudiante' })
            .select('firstName lastName email cedula isActive role createdAt updatedAt');

        if (!student) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.status(200).json({
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            role: student.role,
            cedula: student.cedula,
            isActive: student.isActive,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt
        });
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        res.status(500).json({
            message: 'Error al obtener el estudiante',
            error: error.message
        });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, isActive, cedula } = req.body;
        
        // Verificar si el email ya existe en otro usuario (solo si se proporciona email)
        if (email) {
            const existingUser = await User.findOne({ 
                email, 
                _id: { $ne: req.params.id } 
            });
            
            if (existingUser) {
                return res.status(400).json({
                    message: 'Ya existe un usuario con este correo electrónico'
                });
            }
        }

        // Construir el objeto de actualización
        const updateData = {
            firstName,
            lastName,
            cedula,
            isActive
        };
        
        // Solo incluir email si se proporciona
        if (email) {
            updateData.email = email;
        }

        const updatedStudent = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'Estudiante' },
            updateData,
            { new: true }
        ).select('firstName lastName email cedula isActive');

        if (!updatedStudent) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.status(200).json({
            message: 'Estudiante actualizado exitosamente',
            student: {
                id: updatedStudent._id,
                firstName: updatedStudent.firstName,
                lastName: updatedStudent.lastName,
                email: updatedStudent.email,
                cedula: updatedStudent.cedula,
                isActive: updatedStudent.isActive
            }
        });
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        res.status(500).json({
            message: 'Error al actualizar el estudiante',
            error: error.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await User.findOneAndDelete({
            _id: req.params.id,
            role: 'Estudiante'
        });

        if (!deletedStudent) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.status(200).json({
            message: 'Estudiante eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.status(500).json({
            message: 'Error al eliminar el estudiante',
            error: error.message
        });
    }
};

export const getStudentDetails = async (req, res) => {
    try {
      const studentId = req.params.id;
  
      // Buscar al estudiante por su ID
      const student = await User.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
  
      // Buscar las secciones en las que el estudiante está inscrito
      const sections = await Section.find({ arrayStudents: studentId });
  
      // Obtener información de materias, semestres y evaluaciones pendientes
      const formattedSemesters = await Promise.all(
        sections.map(async (section) => {
          const subject = await Subject.findById(section.subjectId);
          const professor = await User.findById(section.profesorId);
          const semester = await Semester.findById(section.semesterId);
  
          // Buscar el plan de evaluación basado en el nombre de la sección
          const planName = `Plan de evaluación - Sección ${section.sectionNumber}`;
          const evaluationPlan = await EvaluationPlan.findOne({ name: planName });
  
          let pendingAssignments = [];
          if (evaluationPlan) {
            pendingAssignments = await Evaluation.find({
              evaluationPlan: evaluationPlan._id.toString(),
            });
          }
  
          // Formatear evaluaciones pendientes
          const formattedAssignments = pendingAssignments.map(evaluation => ({
            id: evaluation._id,
            name: evaluation.name,
            dueDate: evaluation.dueDate,
            weight: evaluation.weight * 10, // Convertir a porcentaje
            documentLink: evaluation.documentLink
          }));
  
          return {
            id: section.semesterId,
            periodo: semester ? semester.periodo : "N/A",
            año: semester ? semester.año : "N/A",
            secciones: [
              {
                id: section._id,
                materia: subject ? subject.name : "Materia no encontrada",
                codigo: section.subjectId,
                seccion: section.sectionNumber,
                profesor: professor ? `${professor.firstName} ${professor.lastName}` : "Profesor no encontrado",
                enlace: `/seccion/${section.subjectId}-${section.sectionNumber}`,
                pendingAssignments: formattedAssignments
              },
            ],
          };
        })
      );
  
      res.status(200).json({
        promedio: student.promedio || "N/A",
        proximoExamen: "N/A", // Se debe calcular en base a las evaluaciones
        semestres: formattedSemesters,
      });
    } catch (error) {
      console.error("Error al obtener detalles del estudiante:", error);
      res.status(500).json({ 
        message: 'Error en el servidor', 
        error: error.message 
      });
    }
  };
  

