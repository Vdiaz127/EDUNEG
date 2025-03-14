import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';


import cors from "cors";
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js'
import gradeRoutes from './routes/gradeRoutes.js'; // Importación de gradeRoutes
import subjectRoutes from './routes/subjectRoutes.js'; // Importación de subjectRoutes
import semesterRoutes from './routes/semesterRoutes.js'; // Importación de semesterRoutes
import evaluationPlanRoutes from './routes/evaluationPlanRoutes.js'; // Importación de evaluationPlanRoutes
import evaluationRoutes from './routes/evaluationRoutes.js'; // Importación de evaluationPlanRoutes
import sectionRoutes from './routes/sectionRoutes.js'; // Importación de evaluationPlanRoutes
import reportRoutes from './routes/reportRoutes.js'; // Importación de evaluationPlanRoutes

import studentRoutes from './routes/studentRoutes.js';// Importación de studentRoutes
import professorRoutes from './routes/professorRoutes.js'; // Importación de professorRoutes

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Habilita CORS para permitir solicitudes desde diferentes dominios
app.use(bodyParser.json()); // Permite analizar el cuerpo de las solicitudes en formato JSON

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/grades', gradeRoutes); // Define las rutas de calificaciones bajo el prefijo /api/grades
app.use('/api/subjects', subjectRoutes); // Define las rutas de materias bajo el prefijo /api/subjects
app.use('/api/semesters', semesterRoutes); // Define las rutas de semestres bajo el prefijo /api/semesters
app.use('/api/evaluation-plans', evaluationPlanRoutes); // Define las rutas de planes de evaluación bajo el prefijo /api/evaluation-plans
app.use('/api/evaluations', evaluationRoutes); // Define las rutas de evaluaciónes bajo el prefijo /api/evaluations
app.use('/api/sections', sectionRoutes); // Define las rutas de evaluaciónes bajo el prefijo /api/evaluations
app.use('/api/reports', reportRoutes); // Define las rutas de evaluaciónes bajo el prefijo /api/evaluations

app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes); // Define las rutas de profesores bajo el prefijo /api/professors

app.listen(PORT, ()=> {
	
// Iniciar el servidor
  connectDB();
  console.log('Server is running on http://localhost:' + PORT);
});

// Servir archivos estáticos para el frontend
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});