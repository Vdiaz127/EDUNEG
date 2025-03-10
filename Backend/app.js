import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import cors from "cors";
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import semesterRoutes from './routes/semesterRoutes.js';
import evaluationPlanRoutes from './routes/evaluationPlanRoutes.js';
import evaluationRoutes from './routes/evaluationRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // Importa las rutas de subida de archivos

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/evaluation-plans', evaluationPlanRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/upload', uploadRoutes); // Usa las rutas de subida de archivos
app.use("/uploads", express.static("uploads")); // Sirve archivos estáticos desde la carpeta uploads

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