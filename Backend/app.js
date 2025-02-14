import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import materiaRoutes from './routes/materia.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/route.js'; // This will work with default export

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Habilita CORS para permitir solicitudes desde diferentes dominios
app.use(bodyParser.json()); // Permite analizar el cuerpo de las solicitudes en formato JSON



const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 



app.use("/api/materias", materiaRoutes);
app.use('/api/auth', authRoutes); // Define las rutas de autenticación bajo el prefijo /api/auth



app.listen(PORT, ()=> {
  connectDB();
  console.log('Server is running on http://localhost:' + PORT);
});

app.use(express.static(path.join(__dirname, "/Frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
	});

