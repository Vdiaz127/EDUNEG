import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
    periodo: {
        type: Number,
        required: [true, 'El periodo es obligatorio'],
        min: [1, 'El periodo mínimo es 1'],
        max: [2, 'El periodo máximo es 2'],
    },
    año: {
        type: Number,
        required: [true, 'El año es obligatorio'],
        min: [2000, 'El año mínimo es 2000'],
        max: [2100, 'El año máximo es 2100'],
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria'],
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria'],
    },
    status: {
        type: String,
        enum: {
            values: ['cerrado', 'en curso', 'abierto'],
            message: 'El estado debe ser "cerrado", "en curso" o "abierto"',
        },
        default: 'abierto', // Estado por defecto
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Semester = mongoose.model('Semester', semesterSchema);

export default Semester;