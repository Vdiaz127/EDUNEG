import mongoose from 'mongoose';

const evaluationPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del plan de evaluación es requerido'],
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
        values: ['active', 'inactive', 'completed'],
        message: 'El estado debe ser "active", "inactive" o "completed"',
      },
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const EvaluationPlan = mongoose.model('EvaluationPlan', evaluationPlanSchema);

export default EvaluationPlan;