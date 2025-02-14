import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    evaluational: { type: String, required: true },
    studentId: { type: String, required: true },
    score: { type: Number, required: true },
    comments: { type: String }
});

export default mongoose.model('Grade', gradeSchema);