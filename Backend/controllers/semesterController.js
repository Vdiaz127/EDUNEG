import Semester from '../models/Semester.js';

// Crear un nuevo semestre
export const createSemester = async (req, res) => {
    try {
        const { periodo, año, fechaInicio, fechaFin } = req.body;

        // Validar si ya existe un semestre con el mismo periodo y año
        const existingSemester = await Semester.findOne({ periodo, año });
        if (existingSemester) {
            return res.status(400).json({ message: 'Ya existe un semestre con el mismo periodo y año' });
        }

        const semester = new Semester({
            periodo,
            año,
            fechaInicio,
            fechaFin,
        });

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
            return res.status(404).json({ message: 'Semestre no encontrado' });
        }
        res.status(200).json(semester);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un semestre
export const updateSemester = async (req, res) => {
    try {
        const { periodo, año, fechaInicio, fechaFin } = req.body;

        // Validar si ya existe un semestre con el mismo periodo y año, excluyendo el actual
        const existingSemester = await Semester.findOne({ periodo, año, _id: { $ne: req.params.id } });
        if (existingSemester) {
            return res.status(400).json({ message: 'Ya existe un semestre con el mismo periodo y año' });
        }

        const semester = await Semester.findByIdAndUpdate(
            req.params.id,
            { periodo, año, fechaInicio, fechaFin },
            { new: true }
        );

        if (!semester) {
            return res.status(404).json({ message: 'Semestre no encontrado' });
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
            return res.status(404).json({ message: 'Semestre no encontrado' });
        }
        res.status(200).json({ message: 'Semestre eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cambiar el estado de un semestre
export const changeSemesterStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['abierto', 'en curso', 'cerrado'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Estado no válido' });
        }

        const semester = await Semester.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!semester) {
            return res.status(404).json({ message: 'Semestre no encontrado' });
        }

        res.status(200).json(semester);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};