import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    studentId: { 
        type: String,
        required: [true, 'El código del estudiante es requerido'],
        trim: true
    },
    note: { 
        type: Number,
        required: [true, 'El valor de la nota es requerido'],
        min: [0, 'La nota debe ser al menos 0'],
        max: [10, 'La nota no puede exceder 10']
    }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Section', reportSchema);