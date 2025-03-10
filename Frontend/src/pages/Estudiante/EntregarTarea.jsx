import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import { useContext } from "react";

const EntregarTarea = () => {
  const { sectionId, evaluationId } = useParams(); // Parámetros de la URL
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Obtener el usuario (estudiante) desde el contexto
  const [file, setFile] = useState(null); // Archivo seleccionado
  const [loading, setLoading] = useState(false); // Estado de carga general
  const [uploadProgress, setUploadProgress] = useState(0); // Progreso de la subida del archivo
  const [error, setError] = useState(""); // Mensaje de error
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [evaluation, setEvaluation] = useState(null); // Datos de la evaluación (tarea)
  const [section, setSection] = useState(null); // Datos de la sección
  const [materia, setMateria] = useState(null); // Datos de la materia
  const [isDragging, setIsDragging] = useState(false); // Estado para el drag and drop

  // Obtener los datos de la evaluación, la sección y la materia
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos de la evaluación (tarea)
        const evaluationResponse = await axios.get(`/api/evaluations/${evaluationId}`);
        setEvaluation(evaluationResponse.data);

        // Obtener los datos de la sección
        const sectionResponse = await axios.get(`/api/sections/${sectionId}`);
        setSection(sectionResponse.data);

        // Obtener los datos de la materia
        const materiaResponse = await axios.get(`/api/subjects/${sectionResponse.data.subjectId}`);
        setMateria(materiaResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar los datos de la tarea.");
      }
    };

    fetchData();
  }, [sectionId, evaluationId]);

  // Manejar la selección del archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  // Validar y establecer el archivo
  const validateAndSetFile = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // Límite de 10MB
        setError("El archivo no puede ser mayor a 10MB.");
      } else {
        setFile(selectedFile);
        setError("");
      }
    }
  };

  // Manejar el drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Debes seleccionar un archivo.");
      return;
    }
  
    setLoading(true);
    setError("");
    setSuccess("");
    setUploadProgress(0); // Reiniciar el progreso de la subida
  
    try {
      // Crear un FormData para enviar el archivo y los datos
      const formData = new FormData();
      formData.append("file", file); // Agregar el archivo
      formData.append("evaluationId", evaluationId); // Agregar el ID de la evaluación
      formData.append("studentId", user.id); // Agregar el ID del estudiante
  
      // Subir el archivo y crear el Grade en una sola solicitud
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
  
      setSuccess("Tarea entregada exitosamente.");
      setTimeout(() => {
        navigate(`/estudiante/seccion/${sectionId}`);
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      console.error("Error al entregar la tarea:", error);
      setError("Error al entregar la tarea. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
      setUploadProgress(0); // Reiniciar el progreso de la subida
    }
  };
  
  // Función para subir el archivo al servidor
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      return response.data.fileUrl; // Devuelve la URL del archivo subido
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw new Error("Error al subir el archivo.");
    }
  };

  if (!evaluation || !section || !materia) {
    return <div className="text-center text-gray-500">Cargando datos de la tarea...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      {/* Encabezado con los datos de la materia, sección y tarea */}
      <h1 className="text-2xl font-bold mb-4">Entregar Tarea</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{evaluation.name}</h2>
        <p className="text-gray-700">Materia: {materia.name}</p>
        <p className="text-gray-700">Sección: {section.sectionNumber}</p>
        <p className="text-gray-700">Ponderación: {evaluation.weight}%</p>
        <p className="text-gray-700">
          Fecha de entrega: {new Date(evaluation.dueDate).toLocaleDateString()}
        </p>
      </div>

      {/* Formulario para cargar el archivo */}
      <form onSubmit={handleSubmit}>
        {/* Área de arrastrar y soltar */}
        <div
          className={`mb-4 p-6 border-2 border-dashed rounded-lg ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <span className="text-gray-700">
              {file ? (
                <span className="text-blue-500 font-medium">{file.name}</span>
              ) : (
                <>
                  Arrastra y suelta tu archivo aquí o{" "}
                  <span className="text-blue-500 font-medium">haz clic para seleccionar</span>
                </>
              )}
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.zip" // Formatos permitidos
            />
          </label>
        </div>

        {/* Barra de progreso de la subida */}
        {loading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Subiendo archivo... {Math.round(uploadProgress)}%
            </p>
          </div>
        )}

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Botón para entregar la tarea */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Entregando..." : "Entregar Tarea"}
        </button>
      </form>
    </div>
  );
};

export default EntregarTarea;