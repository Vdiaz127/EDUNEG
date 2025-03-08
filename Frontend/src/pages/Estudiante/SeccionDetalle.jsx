import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import { useContext } from "react";

const SeccionDetalle = () => {
  const { id  } = useParams(); // ID de la sección
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Obtener el usuario (estudiante) desde el contexto
  const [evaluationPlan, setEvaluationPlan] = useState(null); // Plan de evaluación
  const [evaluations, setEvaluations] = useState([]); // Evaluaciones del plan
  const [grades, setGrades] = useState([]); // Calificaciones del estudiante
  const [loading, setLoading] = useState(true); // Estado de carga
  const [materia, setMateria] = useState(null); // Datos de la materia
  const [profesor, setProfesor] = useState(null); // Datos del profesor

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          // Obtener los datos de la sección
          const sectionResponse = await axios.get(`/api/sections/${id }`);
          const section = sectionResponse.data;

          // Obtener los datos de la materia
          const materiaResponse = await axios.get(`/api/subjects/${section.subjectId}`);
          setMateria(materiaResponse.data);

          // Obtener los datos del profesor
          const profesorResponse = await axios.get(`/api/professors/${section.profesorId}`);
          setProfesor(profesorResponse.data);

          // Obtener el plan de evaluación de la sección
          const planResponse = await axios.get(`/api/evaluation-plans/by-section?sectionId=${id}`);
          if (planResponse.data.length > 0) {
            const plan = planResponse.data[0];
            setEvaluationPlan(plan);

            // Obtener las evaluaciones del plan de evaluación
            const evaluationsResponse = await axios.get(`/api/evaluations?evaluationPlanId=${plan._id}`);
            setEvaluations(evaluationsResponse.data);

            // Obtener las calificaciones del estudiante para estas evaluaciones
            const gradesResponse = await axios.get(`/api/grades?studentId=${user.id}`);
            setGrades(gradesResponse.data);
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!evaluationPlan) {
    return <div className="text-center text-gray-500">No se encontró un plan de evaluación para esta sección.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Datos de la materia y el profesor */}
      <h1 className="text-2xl font-bold mb-4">Materia: {materia?.name}</h1>
      <p className="text-gray-700 mb-2">Código de la materia: {materia?.acronym}</p>
      <p className="text-gray-700 mb-2">Profesor: {profesor?.firstName} {profesor?.lastName}</p>
      <p className="text-gray-700 mb-4">Código del plan de evaluación: {evaluationPlan.name}</p>

      {/* Lista de evaluaciones (tareas) */}
      <h2 className="text-xl font-semibold mb-4">Tareas</h2>
      <ul className="space-y-4">
        {evaluations.map((evaluation) => {
          const fechaEntrega = new Date(evaluation.dueDate);
          const fechaActual = new Date();
          const puedeEntregar = fechaActual <= fechaEntrega;
          const grade = grades.find((g) => g.evaluationId === evaluation._id);

          return (
            <li key={evaluation._id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-bold">{evaluation.name}</h3>
              <p className="text-gray-700">Fecha de entrega: {fechaEntrega.toLocaleDateString()}</p>
              <p className="text-gray-700">Ponderación: {evaluation.weight}%</p>
              <p className="text-gray-700">Estado: {grade ? grade.status : "Pendiente"}</p>

              {/* Mostrar la calificación si está calificada */}
              {grade && (
                <p className="text-gray-700">Calificación: {grade.score}</p>
              )}

              {/* Botón para cargar la tarea si la fecha de entrega es válida */}
              {!grade && puedeEntregar && (
                <button
                  onClick={() => navigate(`/estudiante/seccion/${id}/entregar-tarea/${evaluation._id}`)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Entregar Tarea
                </button>
              )}

              {/* Mensaje si la fecha de entrega ya pasó */}
              {!grade && !puedeEntregar && (
                <p className="mt-2 text-red-500">La fecha de entrega ha pasado. No se puede entregar la tarea.</p>
              )}

              {/* Mensaje si la tarea ya fue entregada */}
              {grade && (
                <p className="mt-2 text-green-500">Tarea entregada el {new Date(grade.createdAt).toLocaleDateString()}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SeccionDetalle;