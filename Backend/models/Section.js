import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  subjectId: { 
    type: String, 
    required: [true, 'El código de la materia es requerido'], 
    trim: true 
  },
  semesterId: { 
    type: mongoose.Schema.Types.ObjectId, // Cambia a ObjectId
    ref: 'Semester', // Referencia al modelo Semester
    required: [true, 'El código del semestre es requerido'], 
  },
  sectionNumber: { 
    type: String,
    required: [true, 'El código de la sección es requerido'], 
    trim: true 
  },
  arrayStudents: { 
    type: [mongoose.Schema.Types.ObjectId], // Cambia a ObjectId si es necesario
    ref: 'User', // Referencia al modelo User
    default: [] 
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