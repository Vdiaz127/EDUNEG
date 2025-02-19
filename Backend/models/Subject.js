import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: [true, 'El código de la materia es requerido'], 
        trim: true, 
        unique: true, // Asegura que el código sea único
        minlength: [3, 'El código debe tener al menos 3 caracteres'], 
        maxlength: [10, 'El código no puede exceder los 10 caracteres'] 
    },
    name: { 
        type: String, 
        required: [true, 'El nombre de la materia es requerido'], 
        trim: true, 
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'], 
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'] 
    },
    description: { 
        type: String, 
        required: [true, 'La descripción de la materia es requerida'], 
        trim: true, 
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'], 
        maxlength: [500, 'La descripción no puede exceder los 500 caracteres'] 
    },
    credits: { 
        type: Number, 
        required: [true, 'Los créditos de la materia son requeridos'], 
        min: [1, 'Los créditos deben ser al menos 1'], 
        max: [4, 'Los créditos no pueden exceder 4'] 
    }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Subject', subjectSchema);