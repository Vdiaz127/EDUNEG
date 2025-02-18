import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    subjectId: { 
        type: Number, 
        required: [true, 'El código de la materia es requerido'], 
        min: [1, 'El codigo debe ser al menos 1']
    },
    semesterId: { 
        type: Number, 
        required: [true, 'El código del semestre es requerido'], 
        min: [1, 'El codigo debe ser al menos 1']
    },
    sectionNumber: { 
        type: Number, 
        required: [true, 'El código de la sección es requerido'], 
        min: [1, 'El codigo debe ser al menos 1']
    },
    arrayStudents: { 
        type : Array ,
        "default" : [] 
    },
    profesorId: { 
        type: Number, 
        required: [true, 'El código del profesor es requerido'], 
        min: [1, 'El codigo debe ser al menos 1']
    }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Section', sectionSchema);