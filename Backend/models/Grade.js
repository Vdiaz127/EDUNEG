import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    evaluational: { type: String, required: true },
    studentId: { type: String, required: true },
    score: { type: Number, required: true },
    comments: { type: String }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey:false // Esto es para que no aparezca el atributo `__v`
});

export default mongoose.model('Grade', gradeSchema);