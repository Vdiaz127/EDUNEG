import mongoose from 'mongoose';


const asignacionSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // ID de la tarea
    name: { type: String, required: true }, // Nombre de la tarea
    description: { type: String }, // Descripción
    percentage: { type: Number, required: true }, // Porcentaje de la calificación
  });

const profesorSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    titulacion: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    asignaciones: { type: [asignacionSchema], default: [] },
}, {
    timestamps: true // createdAt, updatedAt
});

const Profesor = mongoose.model('Profesor', profesorSchema);

export default Profesor;