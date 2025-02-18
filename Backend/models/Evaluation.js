import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
    evaluationPlan: { 
        type: Number, 
        required: [true, 'El código del plan de evaluación es requerido'], 
        min: [1, 'Los créditos deben ser al menos 1']
    },
    name: { 
        type: String, 
        required: [true, 'El nombre de la evaluación es requerido'], 
        trim: true, 
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'], 
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'] 
    },
    dueDate: { 
        type: Date,
        min: '1950-01-01',
        max: Date.now(),
        required: [true, 'La fecha de entrega de la evaluación es requerida'], 
    },
    weight: { 
        type: Number, 
        required: [true, 'El peso de la evaluación es requeridos'], 
        min: [1, 'Los créditos deben ser al menos 1'], 
        max: [10, 'Los créditos no pueden exceder 10'] 
    },
    documentLink: { 
        type: String
    }
    
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Evaluation', evaluationSchema);