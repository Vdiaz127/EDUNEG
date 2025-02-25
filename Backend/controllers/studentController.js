import User from '../models/User.js';

export const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, isActive } = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario con este correo electrónico'
            });
        }

        // Crear el estudiante
        const student = new User({
            firstName,
            lastName,
            email,
            isActive,
            role: 'Estudiante',
            // Generar una contraseña temporal
           // password: Math.random().toString(36).slice(-8)
        });

        await student.save();

        res.status(201).json({
            message: 'Estudiante creado exitosamente',
            student: {
                id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
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
            .select('firstName lastName email isActive');

        const formattedStudents = students.map(student => ({
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            isActive: student.isActive
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
            .select('firstName lastName email isActive');

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
            isActive: student.isActive
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
        const { firstName, lastName, email, isActive } = req.body;
        
        // Verificar si el email ya existe en otro usuario
        const existingUser = await User.findOne({ 
            email, 
            _id: { $ne: req.params.id } 
        });
        
        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario con este correo electrónico'
            });
        }

        const updatedStudent = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'Estudiante' },
            { firstName, lastName, email, isActive },
            { new: true }
        ).select('firstName lastName email isActive');

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
