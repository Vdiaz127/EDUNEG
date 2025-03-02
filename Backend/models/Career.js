import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la carrera es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder los 500 caracteres'],
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: 'El estado debe ser "active" o "inactive"',
        },
        default: 'active',
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Career = mongoose.model('Career', careerSchema);

export default Career;