import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
    periodo: {
        type: Number,
        required: [true, 'El periodo es obligatorio'], // Mensaje personalizado para el error
        min: [1, 'El periodo mínimo es 1'], // Validación para que el periodo sea al menos 1
        max: [2, 'El periodo máximo es 2'] // Validación para que el periodo no sea mayor a 2
    },
    año: {
        type: Number,
        required: [true, 'El año es obligatorio'], // Mensaje personalizado para el error
        min: [2000, 'El año mínimo es 2000'], // Validación para que el año sea al menos 2000
        max: [2100, 'El año máximo es 2100'] // Validación para que el año no sea mayor a 2100
    }
}, {
    timestamps: true, // Añade automáticamente `createdAt` y `updatedAt`
    versionKey: false // Esto es para que no aparezca el atributo `__v`
});

const Semester = mongoose.model('Semester', semesterSchema);

export default Semester;