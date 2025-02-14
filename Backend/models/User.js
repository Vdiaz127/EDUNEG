import mongoose from 'mongoose'; // Use import instead of require
import bcrypt from 'bcryptjs';

// Definir el esquema del usuario
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Tipo de dato: String
      required: [true, 'El nombre de usuario es obligatorio'], // Campo obligatorio con mensaje personalizado
      unique: true, // Valor único (no se permiten duplicados)
      minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'], // Mínimo de 3 caracteres
      maxlength: [50, 'El nombre de usuario no puede exceder los 50 caracteres'], // Máximo de 50 caracteres
      validate: {
        validator: function (value) {
          // Validación personalizada: solo permite letras, números y guiones bajos
          return /^[a-zA-Z0-9_]+$/.test(value);
        },
        message: 'El nombre de usuario solo puede contener letras, números y guiones bajos (_)',
      },
    },
    password: {
      type: String, // Tipo de dato: String
      required: [true, 'La contraseña es obligatoria'], // Campo obligatorio con mensaje personalizado
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'], // Mínimo de 6 caracteres
      maxlength: [100, 'La contraseña no puede exceder los 100 caracteres'], // Máximo de 100 caracteres
      validate: {
        validator: function (value) {
          // Validación personalizada: la contraseña debe contener al menos un número y una letra
          return /[0-9]/.test(value) && /[a-zA-Z]/.test(value);
        },
        message: 'La contraseña debe contener al menos un número y una letra',
      },
    },
  },
  {
    versionKey: false, // Desactiva la clave de versión (__v)
    timestamps: true, // Habilita los campos de timestamps (createdAt y updatedAt)
  }
);

// Hash de la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Si la contraseña ha sido modificada, la hasheamos
    this.password = await bcrypt.hash(this.password, 8); // Hasheamos la contraseña con bcrypt
  }
  next(); // Continuamos con el siguiente middleware o la operación de guardado
});

// Crear el modelo User a partir del esquema
const User = mongoose.model('User ', userSchema);

// Exportar el modelo para usarlo en otras partes de la aplicación
export default User; // Use export default instead of module.exports