import User from '../models/User.js';
import Section from '../models/Section.js';
import Subject from '../models/Subject.js';
import Semester from '../models/Semester.js';
import mongoose from 'mongoose';

// Obtener todos los profesores
export const getAllProfessors = async (req, res) => {
    try {
        const professors = await User.find({ role: 'Profesor' })
            .select('firstName lastName email isActive role createdAt updatedAt');

        const formattedProfessors = professors.map(professor => ({
            id: professor._id,
            firstName: professor.firstName,
            lastName: professor.lastName,
            email: professor.email,
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
            .select('firstName lastName email isActive role createdAt updatedAt');

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
        const { firstName, lastName, email, isActive, role } = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario con este correo electrónico'
            });
        }

        // Crear el profesor
        const professor = new User({
            firstName,
            lastName,
            email,
            isActive,
            role: role || 'Profesor',
            // Generar una contraseña temporal
            //password: Math.random().toString(36).slice(-8)
        });

        await professor.save();

        res.status(201).json({
            message: 'Profesor creado exitosamente',
            professor: {
                id: professor._id,
                firstName: professor.firstName,
                lastName: professor.lastName,
                email: professor.email,
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
        const { firstName, lastName, email, isActive, role } = req.body;
        
        // Verificar si el email ya existe en otro usuario
        const existingUser = await User.findOne({ 
            email, 
            _id: { $ne: req.params.id } 
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe otro usuario con este correo electrónico'
            });
        }

        const updatedProfessor = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'Profesor' },
            { firstName, lastName, email, isActive, role },
            { new: true }
        ).select('firstName lastName email isActive role createdAt updatedAt');

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
        const secciones = await Section.find({ profesorId: professorId });

        // Obtener la información de las materias y semestres asociados a las secciones
        const formattedSemestres = await Promise.all(
            secciones.map(async (seccion) => {
                // Convertir subjectId (String) a ObjectId
                const subjectId = new mongoose.Types.ObjectId(seccion.subjectId);

                // Obtener la materia asociada a la sección
                const materia = await Subject.findById(subjectId);

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
                            // horario: "Lunes y Miércoles, 10:00 AM - 12:00 PM", // Esto debería venir de la base de datos
                            // enlace: `/seccion/${seccion.subjectId}-${seccion.sectionNumber}`,
                        },
                    ],
                };
            })
        );

        res.status(200).json({
            nombre: `${professor.firstName} ${professor.lastName}`,
            email: professor.email,
            isActive: professor.isActive,
            semestres: formattedSemestres,
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
