import Section from '../models/Section.js';

export const createSection = async (req, res) => {
    try {
        const section = new Section(req.body);
        await section.save();
        res.status(201).send(section);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).send(sections);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) {
            return res.status(404).send();
        }
        res.send(section);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!section) {
            return res.status(404).send();
        }
        res.send(section);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        if (!section) {
            return res.status(404).send();
        }
        res.send(section);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addStudentToSection = async (req, res) => {
    const { sectionId, studentId } = req.body; // Asegúrate de que los datos se envían en el cuerpo de la solicitud
    try {
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).send({ error: 'Sección no encontrada' });
        }

        // Verificar si el estudiante ya está en el arreglo
        if (section.arrayStudents.includes(studentId)) {
            return res.status(400).send({ error: 'El estudiante ya está en la sección' });
        }

        // Agregar el estudiante
        section.arrayStudents.push(studentId);
        await section.save();
        res.send(section);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const removeStudentFromSection = async (req, res) => {
    const { sectionId, studentId } = req.body; // Asegúrate de que los datos se envían en el cuerpo de la solicitud
    try {
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).send({ error: 'Sección no encontrada' });
        }

        // Verificar si el estudiante está en el arreglo
        if (!section.arrayStudents.includes(studentId)) {
            return res.status(400).send({ error: 'El estudiante no está en la sección' });
        }

        // Eliminar el estudiante
        section.arrayStudents = section.arrayStudents.filter(id => id !== studentId);
        await section.save();
        res.send(section);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const isStudentInSection = async (req, res) => {
    const { sectionId, studentId } = req.body; // Asegúrate de que los datos se envían en el cuerpo de la solicitud
    try {
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).send({ error: 'Sección no encontrada' });
        }

        const isInSection = section.arrayStudents.includes(studentId);
        res.send({ isInSection });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSubjectIdsByStudentId = async (req, res) => {
    const { studentId } = req.params; // Asegúrate de que el ID del estudiante se envía como parámetro
    try {
        const sections = await Section.find({ arrayStudents: studentId });
        const subjectIds = sections.map(section => section.subjectId);
        const uniqueSubjectIds = [...new Set(subjectIds)];

        res.send(uniqueSubjectIds);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSubjectIdsByProfessorId = async (req, res) => {
    const { professorId } = req.params; // Asegúrate de que el ID del profesor se envía como parámetro
    try {
        const sections = await Section.find({ profesorId: professorId });
        console.log(sections);
        const subjectIds = sections.map(section => section.subjectId);
        const uniqueSubjectIds = [...new Set(subjectIds)];

        res.send(uniqueSubjectIds);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSectionsBySubjectId = async (req, res) => {
    const { subjectId } = req.params; // Asegúrate de que el ID de la materia se envía como parámetro
    try {
        const sections = await Section.find({ subjectId: subjectId });
        res.send(sections);
    } catch (error) {
        res.status(500).send(error);
    }
};