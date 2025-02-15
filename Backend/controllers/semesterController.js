import Semester from '../models/Semester.js';

// Crear un nuevo semestre
export const createSemester = async (req, res) => {
    try {
        const semester = new Semester(req.body);
        await semester.save();
        res.status(201).json(semester);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los semestres
export const getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find();
        res.status(200).json(semesters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un semestre por ID
export const getSemesterById = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id);
        if (!semester) {
            return res.status(404).json({ message: 'Semester not found' });
        }
        res.status(200).json(semester);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un semestre
export const updateSemester = async (req, res) => {
    try {
        const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!semester) {
            return res.status(404).json({ message: 'Semester not found' });
        }
        res.status(200).json(semester);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un semestre
export const deleteSemester = async (req, res) => {
    try {
        const semester = await Semester.findByIdAndDelete(req.params.id);
        if (!semester) {
            return res.status(404).json({ message: 'Semester not found' });
        }
        res.status(200).json({ message: 'Semester deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};