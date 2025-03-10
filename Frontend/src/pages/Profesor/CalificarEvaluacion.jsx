import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CalificarEvaluacion = () => {
  const { gradeId } = useParams(); // Obtener el ID de la calificación (grade) desde la URL
  const navigate = useNavigate();
  const [grade, setGrade] = useState(null);
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        // Obtener los detalles de la calificación (grade) desde el backend
        const response = await axios.get(`/api/grades/${gradeId}`);
        setGrade(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la calificación:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrade();
  }, [gradeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la calificación y los comentarios al backend
      await axios.put(`/api/grades/${gradeId}`, { score, comments });

      // Redirigir a la vista anterior después de calificar
      navigate(-1); // Regresa a la página anterior
    } catch (error) {
      console.error("Error al calificar la evaluación:", error);
      alert("No se pudo calificar la evaluación. Inténtalo de nuevo.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!grade) {
    return <div className="text-center text-gray-500">No se encontró la calificación.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Resumen de la materia, estudiante y evaluación */}
      <h1 className="text-2xl font-bold mb-4">Calificar Evaluación</h1>
      <div className="mb-6">
        <p className="text-gray-700"><strong>Materia:</strong> {grade.evaluationId?.name}</p>
        <p className="text-gray-700"><strong>Estudiante:</strong> {grade.studentId?.firstName} {grade.studentId?.lastName}</p>
        <p className="text-gray-700"><strong>Evaluación:</strong> {grade.evaluationId?.name}</p>
      </div>

      {/* Formulario de calificación */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Calificación (0 - 100)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comentarios
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Guardar Calificación
        </button>
      </form>
    </div>
  );
};

export default CalificarEvaluacion;