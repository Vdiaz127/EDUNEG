import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'El nombre es obligatorio.'] 
    },
    lastName: { 
        type: String, 
        required: [true, 'El apellido es obligatorio.'] 
    },
    email: { 
        type: String, 
        required: [true, 'El correo electrónico es obligatorio.'], 
        unique: [true, 'El correo electrónico ya está en uso.'],
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validación básica de correo electrónico
            },
            message: props => `${props.value} no es un correo electrónico válido.`
        }
    },
    password: { 
        type: String, 
        // required: [true, 'La contraseña es obligatoria.'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres.']
    },
    role: { 
        type: String, 
        required: [true, 'El rol es obligatorio.'] 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, { 
    timestamps: true,
    versionKey: false
});

// Encriptar la contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para verificar la contraseña
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);

  };

const User = mongoose.model('User ', userSchema); // Nota: se eliminó el espacio extra en 'User  '
export default User;