import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; // Añadir esta línea
import { connectDB } from './config/db.js';
import materiaRoutes from './routes/materia.route.js';
import authRoutes from './routes/auth.routes.js'; // Añadir esta línea

dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Añadir middleware de cors
app.use(cors());
app.use(express.json()); 

// Añadir rutas de autenticación
app.use("/api/auth", authRoutes);
app.use("/api/materias", materiaRoutes);

app.listen(PORT, ()=> {
  connectDB();
  console.log('Server is running on http://localhost:' + PORT);
});

app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});