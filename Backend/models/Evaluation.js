import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    del_section: { type: String, required: true }
});

export default mongoose.model('Evaluation', evaluationSchema);