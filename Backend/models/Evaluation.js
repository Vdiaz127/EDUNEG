import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    del_section: { type: String, required: true }
}, {
    timestamps: true, // Esto añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Evaluation', evaluationSchema);