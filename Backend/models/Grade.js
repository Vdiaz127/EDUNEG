import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluation',
    required: [true, 'El ID de la evaluación es requerido'],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ',
    required: [true, 'El ID del estudiante es requerido'],
  },
  fileUrl: {
    type: String,
    required: [true, 'La URL del archivo es requerida'],
  },
  status: {
    type: String,
    enum: {
      values: ['Pendiente', 'Entregado', 'Calificado'],
      message: 'El estado debe ser "Pendiente", "Entregado" o "Calificado"',
    },
    default: 'Entregado',
  },
  score: {
    type: Number,
    min: [0, 'La puntuación mínima es 0'],
    max: [100, 'La puntuación máxima es 100'],
  },
  comments: {
    type: String,
    trim: true,
    maxlength: [500, 'Los comentarios no pueden exceder los 500 caracteres'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default mongoose.model('Grade', gradeSchema);