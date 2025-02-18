import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const user = new User({ firstName, lastName, email, password, role });
        await user.save();
        res.status(201).json({ message: "Usuario creado exitosamente." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Función para iniciar sesión
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        
        res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};