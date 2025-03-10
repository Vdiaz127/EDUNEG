import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, 'El ID de la materia es requerido'],
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: [true, 'El ID del semestre es requerido'],
    },
    sectionNumber: {
        type: String,
        required: [true, 'El código de la sección es requerido'],
        trim: true,
    },
    arrayStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User ',
        default: [],
    },
    profesorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El ID del profesor es requerido'],
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('Section', sectionSchema);