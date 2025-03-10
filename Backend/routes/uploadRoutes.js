import express from "express";
import upload from "../utils/upload.js"; // Importa el módulo upload
import { uploadFile } from "../controllers/uploadController.js"; // Importa el controlador

const router = express.Router();

// Ruta para subir archivos y crear el Grade
router.post("/", upload.single("file"), uploadFile);

export default router; // Exporta el router como default