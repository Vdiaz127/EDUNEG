import mongoose from 'mongoose'; // Importa mongoose para usar ObjectId
import User from '../models/User.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';
import Semester from '../models/Semester.js';

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
    const secciones = await Section.find({ arrayStudents: studentId });

    // Obtener la información de las materias y semestres asociados a las secciones
    const formattedSemestres = await Promise.all(
      secciones.map(async (seccion) => {
        // Convertir subjectId (String) a ObjectId
        const subjectId = new mongoose.Types.ObjectId(seccion.subjectId); // Usar new

        // Obtener la materia asociada a la sección
        const materia = await Subject.findById(subjectId);

        // Convertir profesorId (String) a ObjectId
        const profesorId = new mongoose.Types.ObjectId(seccion.profesorId); // Usar new

        // Obtener el profesor asociado a la sección
        const profesor = await User.findById(profesorId);

        // Obtener el semestre asociado a la sección
        const semestre = await Semester.findById(seccion.semesterId);

        return {
          id: seccion.semesterId,
          periodo: semestre ? semestre.periodo : "N/A",
          año: semestre ? semestre.año : "N/A",
          secciones: [
            {
              id: seccion._id,
              materia: materia ? materia.name : "Materia no encontrada",
              codigo: seccion.subjectId,
              seccion: seccion.sectionNumber,
              profesor: profesor ? `${profesor.firstName} ${profesor.lastName}` : "Profesor no encontrado",
              horario: "Lunes y Miércoles, 10:00 AM - 12:00 PM", // Esto debería venir de la base de datos
              enlace: `/seccion/${seccion.subjectId}-${seccion.sectionNumber}`,
            },
          ],
        };
      })
    );

    res.status(200).json({
      promedio: student.promedio || "N/A",
      proximoExamen: "15 de Abril", // Esto debería venir de la base de datos
      semestres: formattedSemestres,
    });
  } catch (error) {
    console.error("Error al obtener detalles del estudiante:", error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};