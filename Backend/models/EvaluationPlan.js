import mongoose from 'mongoose';

const evaluationPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'completed'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
    versionKey: false, // Esto es para que no aparezca el atributo `__v`
  }
);

const EvaluationPlan = mongoose.model('EvaluationPlan', evaluationPlanSchema);

export default EvaluationPlan;