import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerPlanEvaluacion = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [evaluationPlan, setEvaluationPlan] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el plan de evaluación de la sección
        const planResponse = await axios.get(`/api/evaluation-plans/by-section?sectionId=${sectionId}`);
        if (planResponse.data.length > 0) {
          const plan = planResponse.data[0];
          setEvaluationPlan(plan);

          // Obtener las evaluaciones asociadas al plan
          const evaluationsResponse = await axios.get(`/api/evaluations?evaluationPlanId=${plan._id}`);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionId]);

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!evaluationPlan) {
    return <div className="text-center text-gray-500">No se encontró un plan de evaluación para esta sección.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Datos del plan de evaluación */}
      <h1 className="text-2xl font-bold mb-4">Plan de Evaluación: {evaluationPlan.name}</h1>
      <p className="text-gray-700 mb-2">Descripción: {evaluationPlan.description}</p>
      <p className="text-gray-700 mb-2">Estado: {evaluationPlan.isLocked ? 'Bloqueado' : 'Activo'}</p>
      <p className="text-gray-700 mb-4">
        Fechas: {new Date(evaluationPlan.startDate).toLocaleDateString()} - {new Date(evaluationPlan.endDate).toLocaleDateString()}
      </p>

      {/* Lista de evaluaciones */}
      <h2 className="text-xl font-semibold mb-4">Evaluaciones</h2>
      <ul className="space-y-4">
        {evaluations.map((evaluation) => (
          <li key={evaluation._id} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold">{evaluation.name}</h3>
            <p className="text-gray-700">Fecha de entrega: {new Date(evaluation.dueDate).toLocaleDateString()}</p>
            <p className="text-gray-700">Ponderación: {evaluation.weight}%</p>
            <p className="text-gray-700">Estado: {evaluation.status}</p>

            {/* Lista de estudiantes con sus calificaciones */}
            <h4 className="text-md font-semibold mt-4">Calificaciones de Estudiantes:</h4>
            <table className="w-full mt-2">
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
                  const grade = grades.find(
                    (g) => g.evaluationId === evaluation._id && g.studentId === student._id
                  );
                  return (
                    <tr key={student._id} className="border-b">
                      <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                      <td className="px-4 py-2">{grade ? grade.score : 'Sin calificar'}</td>
                      <td className="px-4 py-2">{grade ? grade.comments : '-'}</td>
                      <td className="px-4 py-2">
                        {grade && (
                          <button
                            onClick={() => navigate(`/profesor/grade/${grade._id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Ver Detalles
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerPlanEvaluacion;