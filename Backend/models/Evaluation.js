import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la evaluación es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    dueDate: {
        type: Date,
        required: [true, 'La fecha de entrega es requerida'],
    },
    weight: {
        type: Number,
        required: [true, 'El peso de la evaluación es requerido'],
        min: [1, 'El peso mínimo es 1'],
        max: [100, 'El peso máximo es 100'],
    },
    status: {
        type: String,
        enum: {
            values: ['Creada', 'Disponible', 'Cerrada'],
            message: 'El estado debe ser "Creada", "Disponible" o "Cerrada"',
        },
        default: 'Creada',
    },
    evaluationPlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EvaluationPlan',
        required: [true, 'El ID del plan de evaluación es requerido'],
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

export default Evaluation;