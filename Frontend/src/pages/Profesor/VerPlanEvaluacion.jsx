import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaEdit, FaTrash, FaDownload, FaFilePdf } from 'react-icons/fa';
import Notification from '../../components/Notification'; // Importa el componente de notificación

const VerPlanEvaluacion = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [evaluationPlan, setEvaluationPlan] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Función para mostrar notificaciones
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Función para cerrar la notificación
  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el plan de evaluación de la sección
        const planResponse = await axios.get(`/api/evaluation-plans/by-section?sectionId=${sectionId}`);
        if (planResponse.data.length > 0) {
          const plan = planResponse.data[0];
          setEvaluationPlan(plan);

          // Obtener las evaluaciones asociadas al plan
          const evaluationsResponse = await axios.get(`/api/evaluations/by-plan/${plan._id}`);
          setEvaluations(evaluationsResponse.data);

          // Obtener los estudiantes inscritos en la sección
          const studentsResponse = await axios.get(`/api/sections/${sectionId}/students`);
          setStudents(studentsResponse.data);

          // Obtener todas las calificaciones (grades) para las evaluaciones del plan
          const gradesResponse = await axios.get(`/api/grades`);
          setGrades(gradesResponse.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        showNotification('Error al cargar los datos', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionId]);

  const handleDeleteTask = async (taskId) => {
    try {
      // Llamar a la API para eliminar la entrega
      await axios.delete(`/api/grades/${taskId}/delete-file`);

      // Actualizar el estado local
      setGrades((prevGrades) =>
        prevGrades.map((grade) =>
          grade._id === taskId ? { ...grade, fileUrl: null, status: 'Pendiente' } : grade
        )
      );

      // Mostrar notificación de éxito
      showNotification('Entrega eliminada exitosamente', 'success');
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      showNotification('No se pudo eliminar la entrega. Inténtalo de nuevo.', 'error');
    }
  };

  const handleGradeTask = (gradeId) => {
    navigate(`/profesor/grade/${gradeId}`); // Redirigir a la vista de calificación
  };

  const handleCloseSection = async (evaluationPlanId) => {
    try {
      // Llamar a la API para cerrar la sección
      const response = await axios.post(`/api/evaluation-plans/${evaluationPlanId}/close-section`);

      // Mostrar notificación de éxito
      showNotification(response.data.message, 'success');

      // Recargar la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error al cerrar la sección:", error);
      showNotification('No se pudo cerrar la sección. Inténtalo de nuevo.', 'error');
    }
  };

  const generatePDF = async () => {
    try {
      // Solicitar el PDF al backend
      const response = await axios.get(`/api/evaluation-plans/${evaluationPlan._id}/generate-acta-cierre`, {
        responseType: 'json',
      });
  
      // Crear un enlace temporal para descargar el PDF
      const link = document.createElement('a');
      link.href = response.data.pdf;
      link.download = `Acta_de_Cierre_${evaluationPlan.name}.pdf`;
      link.click();
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      showNotification('Error al generar el PDF. Inténtalo de nuevo.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (!evaluationPlan) {
    return <div className="text-center text-gray-500">No se encontró un plan de evaluación para esta sección.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Notificación */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      {/* Encabezado del plan de evaluación */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">Plan de Evaluación: {evaluationPlan.name}</h1>
        <p className="text-gray-700 mb-2">Descripción: {evaluationPlan.description}</p>
        <p className="text-gray-700 mb-2">Estado: {evaluationPlan.isLocked ? 'Bloqueado' : 'Activo'}</p>
        <p className="text-gray-700 mb-4">
          Fechas: {new Date(evaluationPlan.startDate).toLocaleDateString()} - {new Date(evaluationPlan.endDate).toLocaleDateString()}
        </p>

        {/* Botón para cerrar la sección */}
        {evaluationPlan.status !== 'completed' && (
          <button
            onClick={() => handleCloseSection(evaluationPlan._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mb-4"
          >
            Cerrar Sección
          </button>
        )}

        {/* Botón para generar el PDF */}
        {evaluationPlan.status === 'completed' && (
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mb-4"
          >
            <FaFilePdf className="inline-block mr-2" />
            Generar Acta de Cierre (PDF)
          </button>
        )}
      </div>

      {/* Lista de evaluaciones */}
      <h2 className="text-xl font-semibold mb-4">Evaluaciones</h2>
      <div className="space-y-4">
        {evaluations.map((evaluation) => (
          <div key={evaluation._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{evaluation.name}</h3>
            <p className="text-gray-700 mb-2">Fecha de entrega: {new Date(evaluation.dueDate).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-2">Ponderación: {evaluation.weight}%</p>
            <p className="text-gray-700 mb-4">Estado: {evaluation.status}</p>

            {/* Lista de estudiantes con sus calificaciones */}
            <h4 className="text-md font-semibold mt-4 mb-2">Calificaciones de Estudiantes:</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Estudiante</th>
                    <th className="px-4 py-2 text-left">Calificación</th>
                    <th className="px-4 py-2 text-left">Comentarios</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const grade = grades.find((g) => {
                      // Verificar que g.evaluationId y g.studentId existan
                      if (!g.evaluationId || !g.studentId) {
                        console.warn("Grade sin evaluationId o studentId:", g);
                        return false;
                      }

                      // Extraer los IDs correctamente
                      const gradeEvaluationId =
                        typeof g.evaluationId === 'object' ? g.evaluationId._id.toString() : g.evaluationId.toString();
                      const gradeStudentId =
                        typeof g.studentId === 'object' ? g.studentId._id.toString() : g.studentId.toString();
                      const currentEvaluationId = evaluation._id.toString();
                      const currentStudentId = student._id.toString();

                      // Comparar los IDs
                      return (
                        gradeEvaluationId === currentEvaluationId &&
                        gradeStudentId === currentStudentId
                      );
                    });

                    return (
                      <tr key={student._id} className="border-b">
                        <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                        <td className="px-4 py-2">{grade ? grade.score : 'Sin calificar'}</td>
                        <td className="px-4 py-2">{grade ? grade.comments : '-'}</td>
                        <td className="px-4 py-2">
                          {grade && grade.fileUrl ? (
                            <div className="flex space-x-2">
                              {grade.status !== 'Calificado' && (
                                <button
                                  onClick={() => handleGradeTask(grade._id)}
                                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                  <FaEdit />
                                </button>
                              )}
                              <a
                                href={grade.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                              >
                                <FaDownload />
                              </a>
                              <button
                                onClick={() => handleDeleteTask(grade._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          ) : (
                            <p className="text-gray-500">No entregado</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerPlanEvaluacion;