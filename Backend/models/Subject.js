// models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la materia es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    description: {
        type: String,
        required: [true, 'La descripción de la materia es requerida'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede exceder los 500 caracteres'],
    },
    credits: {
        type: Number,
        required: [true, 'Los créditos de la materia son requeridos'],
        min: [1, 'Los créditos deben ser al menos 1'],
        max: [4, 'Los créditos no pueden exceder 4'],
    },
    careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required: [true, 'El ID de la carrera es requerido'],
    },
    acronym: {
        type: String,
        unique: true, // Asegura que el acrónimo sea único
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Validación para evitar materias con el mismo nombre en la misma carrera
subjectSchema.index({ name: 1, careerId: 1 }, { unique: true });

export default mongoose.model('Subject', subjectSchema);