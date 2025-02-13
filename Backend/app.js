import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import materiaRoutes from './routes/materia.route.js';

dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 



app.use("/api/materias", materiaRoutes);


app.listen(PORT, ()=> {
  connectDB();
  console.log('Server is running on http://localhost:' + PORT);
});

app.use(express.static(path.join(__dirname, "/Frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
	});

