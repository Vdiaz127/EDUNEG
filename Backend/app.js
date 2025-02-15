import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import materiaRoutes from './routes/materia.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/loginRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js'; // Importación de gradeRoutes
import subjectRoutes from './routes/subjectRoutes.js'; // Importación de subjectRoutes
import evaluationPlanRoutes from './routes/evaluationPlanRoutes.js'; // Importación de evaluationPlanRoutes

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Habilita CORS para permitir solicitudes desde diferentes dominios
app.use(bodyParser.json()); // Permite analizar el cuerpo de las solicitudes en formato JSON

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rutas
app.use("/api/materias", materiaRoutes);
app.use('/api/auth', authRoutes); // Define las rutas de autenticación bajo el prefijo /api/auth
app.use('/api/grades', gradeRoutes); // Define las rutas de calificaciones bajo el prefijo /api/grades
app.use('/api/subjects', subjectRoutes); // Define las rutas de materias bajo el prefijo /api/subjects
app.use('/api/evaluation-plans', evaluationPlanRoutes); // Define las rutas de planes de evaluación bajo el prefijo /api/evaluation-plans

// Iniciar el servidor
app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on http://localhost:' + PORT);
});

// Servir archivos estáticos para el frontend
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});