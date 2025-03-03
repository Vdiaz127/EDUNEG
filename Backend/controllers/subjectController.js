// controllers/subjectController.js
import Subject from '../models/Subject.js';
import Career from '../models/Career.js';
import { generateAcronym } from '../utils/generateAcronym.js';

export const createSubject = async (req, res) => {
    try {
        const { name, description, credits, careerId } = req.body;

        // Verificar si ya existe una materia con el mismo nombre en la misma carrera
        const existingSubject = await Subject.findOne({ name, careerId });
        if (existingSubject) {
            return res.status(400).json({ message: 'Ya existe una materia con este nombre en la carrera seleccionada.' });
        }

        // Obtener el nombre de la carrera para generar el acrónimo
        const career = await Career.findById(careerId);
        if (!career) {
            return res.status(404).json({ message: 'Carrera no encontrada.' });
        }

        // Generar el acrónimo
        const acronym = generateAcronym(career.name, name);

        // Crear la materia
        const subject = new Subject({
            name,
            description,
            credits,
            careerId,
            acronym,
        });

        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('careerId', 'name');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('careerId', 'name');
        if (!subject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSubject = async (req, res) => {
    try {
        const { name, description, credits, careerId } = req.body;

        // Verificar si ya existe una materia con el mismo nombre en la misma carrera
        const existingSubject = await Subject.findOne({ name, careerId, _id: { $ne: req.params.id } });
        if (existingSubject) {
            return res.status(400).json({ message: 'Ya existe una materia con este nombre en la carrera seleccionada.' });
        }

        // Obtener el nombre de la carrera para generar el acrónimo
        const career = await Career.findById(careerId);
        if (!career) {
            return res.status(404).json({ message: 'Carrera no encontrada.' });
        }

        // Generar el acrónimo
        const acronym = generateAcronym(career.name, name);

        // Actualizar la materia
        const subject = await Subject.findByIdAndUpdate(
            req.params.id,
            { name, description, credits, careerId, acronym },
            { new: true }
        );

        if (!subject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }
        res.status(200).json({ message: 'Materia eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};