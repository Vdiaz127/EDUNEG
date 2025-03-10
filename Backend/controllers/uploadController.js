import Grade from "../models/Grade.js";

export const uploadFile = async (req, res) => {
  try {
    const { evaluationId, studentId } = req.body; // Extrae evaluationId y studentId del cuerpo de la solicitud

    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ningún archivo." });
    }

    // Generar la URL del archivo subido
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Crear el Grade en la base de datos
    const grade = new Grade({
      evaluationId, // Usa el ID de la evaluación
      studentId, // Usa el ID del estudiante
      fileUrl, // URL del archivo subido
      status: "Entregado", // Estado de la tarea
    });

    await grade.save(); // Guardar el Grade en la base de datos

    res.status(201).json({ message: "Tarea entregada exitosamente.", grade });
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({ message: "Error al subir el archivo.", error: error.message });
  }
};