import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Materia = mongoose.model('Materia', materiaSchema);

export default Materia;