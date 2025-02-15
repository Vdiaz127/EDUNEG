import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    evaluational: { 
        type: String, 
        required: [true, 'El campo evaluacional es requerido'], 
        trim: true 
    },
    studentId: { 
        type: String, 
        required: [true, 'El ID del estudiante es requerido'], 
        trim: true 
    },
    score: { 
        type: Number, 
        required: [true, 'La puntuación es requerida'], 
        min: [0, 'La puntuación mínima es 1'], 
        max: [100, 'La puntuación máxima es 100'] 
    },
    comments: { 
        type: String, 
        trim: true, 
        maxlength: [500, 'Los comentarios no pueden exceder los 500 caracteres'] 
    }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Grade', gradeSchema);