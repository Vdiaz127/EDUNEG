// En tu archivo de rutas o en un archivo de configuración
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único del archivo
  },
});

const upload = multer({ storage });

// Ruta para subir archivos
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se ha subido ningún archivo." });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ fileUrl });
});

// Servir archivos estáticos
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});