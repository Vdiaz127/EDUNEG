import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    subjectId: { 
        type: String, 
        required: [true, 'El código de la materia es requerido'], 
        trim: true 
    },
    semesterId: { 
        type: String,  
        required: [true, 'El código del semestre es requerido'], 
        trim: true
    },
    sectionNumber: { 
        type: String,
        required: [true, 'El código de la sección es requerido'], 
        trim: true
    },
    arrayStudents: { 
        type : Array ,
        "default" : [] 
    },
    profesorId: { 
        type: String,
        required: [true, 'El código del profesor es requerido'], 
        trim: true
    }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Section', sectionSchema);