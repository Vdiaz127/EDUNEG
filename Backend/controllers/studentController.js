import User from '../models/User.js';

export const createStudent = async (req, res) => {
    try {
        const { nombre, apellido, email, estatus } = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario con este correo electrónico'
            });
        }

        // Crear el estudiante
        const student = new User({
            nombre,
            apellido,
            email,
            estatus,
            rol: 'Estudiante',
            // Generar una contraseña temporal
            password: Math.random().toString(36).slice(-8)
        });

        await student.save();

        res.status(201).json({
            message: 'Estudiante creado exitosamente',
            student: {
                id: student._id,
                nombre: student.nombre,
                apellido: student.apellido,
                email: student.email,
                estatus: student.estatus
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
        const students = await User.find({ rol: 'Estudiante' })
            .select('nombre apellido email estatus');

        const formattedStudents = students.map(student => ({
            id: student._id,
            nombre: `${student.nombre} ${student.apellido}`,
            email: student.email,
            isActive: student.estatus ? "Activo" : "Inactivo"
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
        const student = await User.findOne({ _id: req.params.id, rol: 'Estudiante' })
            .select('nombre apellido email estatus');

        if (!student) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.status(200).json({
            id: student._id,
            nombre: student.nombre,
            apellido: student.apellido,
            email: student.email,
            estatus: student.estatus
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
        const { nombre, apellido, email, estatus } = req.body;
        
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
            { _id: req.params.id, rol: 'Estudiante' },
            { nombre, apellido, email, estatus },
            { new: true }
        ).select('nombre apellido email estatus');

        if (!updatedStudent) {
            return res.status(404).json({
                message: 'Estudiante no encontrado'
            });
        }

        res.status(200).json({
            message: 'Estudiante actualizado exitosamente',
            student: {
                id: updatedStudent._id,
                nombre: updatedStudent.nombre,
                apellido: updatedStudent.apellido,
                email: updatedStudent.email,
                estatus: updatedStudent.estatus
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
            rol: 'Estudiante'
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
