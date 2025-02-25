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
    startDate: {
      type: Date,
      required: [true, 'La fecha de inicio es requerida'],
      validate: {
        validator: function (value) {
          // Validar que la fecha de inicio no sea en el pasado
          return value >= new Date();
        },
        message: 'La fecha de inicio no puede ser en el pasado',
      },
    },
    endDate: {
      type: Date,
      required: [true, 'La fecha de finalización es requerida'],
      validate: {
        validator: function (value) {
          // Validar que la fecha de finalización sea posterior a la fecha de inicio
          return value > this.startDate;
        },
        message: 'La fecha de finalización debe ser posterior a la fecha de inicio',
      },
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
    timestamps: true, // Habilita createdAt y updatedAt automáticamente
    versionKey: false, // Esto es para que no aparezca el atributo `__v`
  }
);

const EvaluationPlan = mongoose.model('EvaluationPlan', evaluationPlanSchema);

export default EvaluationPlan;