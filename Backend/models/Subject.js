import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Subject', subjectSchema);