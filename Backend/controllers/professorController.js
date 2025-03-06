import User from '../models/User.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';
import Semester from '../models/Semester.js';
import Evaluation from '../models/Evaluation.js'; // Importar el modelo Evaluation
import mongoose from 'mongoose';


// Obtener todos los profesores
export const getAllProfessors = async (req, res) => {
    try {
        const professors = await User.find({ role: 'Profesor' })
            .select('firstName lastName email cedula isActive role createdAt updatedAt');

        const formattedProfessors = professors.map(professor => ({
            id: professor._id,
            firstName: professor.firstName,
            lastName: professor.lastName,
            email: professor.email,
            cedula: professor.cedula,
            isActive: professor.isActive,
            role: professor.role,
            createdAt: professor.createdAt,
            updatedAt: professor.updatedAt
        }));

        res.status(200).json(formattedProfessors);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({
            message: 'Error al obtener la lista de profesores',
            error: error.message
        });
    }
};

// Obtener un profesor por ID
export const getProfessorById = async (req, res) => {
    try {
        const professor = await User.findOne({ _id: req.params.id, role: 'Profesor' })
            .select('firstName lastName email cedula isActive role createdAt updatedAt');

        if (!professor) {
            return res.status(404).json({
                message: 'Profesor no encontrado'
            });
        }

        res.status(200).json({
            id: professor._id,
            firstName: professor.firstName,
            lastName: professor.lastName,
            email: professor.email,
            cedula: professor.cedula,
            isActive: professor.isActive,
            role: professor.role,
            createdAt: professor.createdAt,
            updatedAt: professor.updatedAt
        });
    } catch (error) {
        console.error('Error al obtener profesor:', error);
        res.status(500).json({
            message: 'Error al obtener el profesor',
            error: error.message
        });
    }
};

// Crear un nuevo profesor
export const createProfessor = async (req, res) => {
    try {
        const { firstName, lastName, isActive, role, cedula } = req.body;

        // Verificar si la cédula ya existe
        const existingUser = await User.findOne({ cedula });
        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario con esta cédula'
            });
        }

        // Crear el profesor
        const professor = new User({
            firstName,
            lastName,
            cedula,
            isActive,
            role: role || 'Profesor',
        });

        await professor.save();

        res.status(201).json({
            message: 'Profesor creado exitosamente',
            professor: {
                id: professor._id,
                firstName: professor.firstName,
                lastName: professor.lastName,
                cedula: professor.cedula,
                isActive: professor.isActive,
                role: professor.role,
                createdAt: professor.createdAt,
                updatedAt: professor.updatedAt
            }
        });
    } catch (error) {
        console.error('Error al crear profesor:', error);
        res.status(500).json({
            message: 'Error al crear el profesor',
            error: error.message
        });
    }
};

// Actualizar un profesor
export const updateProfessor = async (req, res) => {
    try {
        const { firstName, lastName, email, isActive, role, cedula } = req.body;
        
        // Verificar si el email ya existe en otro usuario (solo si se proporciona email)
        if (email) {
            const existingUser = await User.findOne({ 
                email, 
                _id: { $ne: req.params.id } 
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Ya existe otro usuario con este correo electrónico'
                });
            }
        }

        // Construir el objeto de actualización
        const updateData = {
            firstName,
            lastName,
            cedula,
            isActive,
            role
        };
        
        // Solo incluir email si se proporciona
        if (email) {
            updateData.email = email;
        }

        const updatedProfessor = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'Profesor' },
            updateData,
            { new: true }
        ).select('firstName lastName email cedula isActive role createdAt updatedAt');

        if (!updatedProfessor) {
            return res.status(404).json({
                message: 'Profesor no encontrado'
            });
        }

        res.status(200).json({
            message: 'Profesor actualizado exitosamente',
            professor: {
                id: updatedProfessor._id,
                firstName: updatedProfessor.firstName,
                lastName: updatedProfessor.lastName,
                email: updatedProfessor.email,
                cedula: updatedProfessor.cedula,
                isActive: updatedProfessor.isActive,
                role: updatedProfessor.role,
                createdAt: updatedProfessor.createdAt,
                updatedAt: updatedProfessor.updatedAt
            }
        });
    } catch (error) {
        console.error('Error al actualizar profesor:', error);
        res.status(500).json({
            message: 'Error al actualizar el profesor',
            error: error.message
        });
    }
};

// Eliminar un profesor
export const deleteProfessor = async (req, res) => {
    try {
        const professor = await User.findOneAndDelete({ 
            _id: req.params.id,
            role: 'Profesor'
        });

        if (!professor) {
            return res.status(404).json({
                message: 'Profesor no encontrado'
            });
        }

        res.status(200).json({
            message: 'Profesor eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar profesor:', error);
        res.status(500).json({
            message: 'Error al eliminar el profesor',
            error: error.message
        });
    }
};

// Obtener detalles del profesor
export const getProfessorDetails = async (req, res) => {
    try {
      const professorId = req.params.id;
  
      // Buscar al profesor por su ID
      const professor = await User.findById(professorId);
      if (!professor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
  
      // Buscar las secciones en las que el profesor está asignado
      const secciones = await Section.find({ profesorId: professorId })
        .populate('subjectId', 'name') // Popula el nombre de la materia
        .populate('semesterId', 'periodo año status'); // Popula los datos del semestre
  
      // Verificar que secciones es un array
      if (!Array.isArray(secciones)) {
        return res.status(500).json({ message: 'Error: secciones no es un array' });
      }
  
      // Agrupar las secciones por semestre y filtrar por estado
      const semestresFiltrados = await secciones.reduce(async (accPromise, seccion) => {
        const acc = await accPromise;
  
        // Filtrar semestres con estado "en curso" o "cerrado"
        if (seccion.semesterId.status === 'en curso' || seccion.semesterId.status === 'cerrado') {
          const semestreId = seccion.semesterId._id.toString();
          const semestreExistente = acc.find(s => s.id === semestreId);
  
          // Obtener el número de estudiantes en la sección
          const studentCount = seccion.arrayStudents.length;
  
          // Obtener el número de evaluaciones pendientes en la sección
          const pendingEvaluations = await Evaluation.find({
            evaluationPlanId: seccion._id,
            status: 'Pendiente',
          });
          const pendingEvaluationsCount = pendingEvaluations.length;
  
          if (semestreExistente) {
            // Si el semestre ya existe, agregar la sección
            semestreExistente.secciones.push({
              id: seccion._id,
              materia: seccion.subjectId.name,
              seccion: seccion.sectionNumber,
              studentCount,
              pendingEvaluationsCount,
            });
          } else {
            // Si el semestre no existe, crear un nuevo semestre
            acc.push({
              id: semestreId,
              periodo: seccion.semesterId.periodo,
              año: seccion.semesterId.año,
              status: seccion.semesterId.status,
              secciones: [
                {
                  id: seccion._id,
                  materia: seccion.subjectId.name,
                  seccion: seccion.sectionNumber,
                  studentCount,
                  pendingEvaluationsCount,
                },
              ],
            });
          }
        }
  
        return acc;
      }, Promise.resolve([]));
  
      res.status(200).json({
        nombre: `${professor.firstName} ${professor.lastName}`,
        email: professor.email,
        cedula: professor.cedula,
        isActive: professor.isActive,
        semestres: semestresFiltrados, // Semestres filtrados y agrupados
      });
    } catch (error) {
      console.error("Error al obtener detalles del profesor:", error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  };
  
export default {
    getAllProfessors,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    getProfessorDetails
};
