import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const SeccionDetalle = () => {
  const { id } = useParams(); // ID de la sección
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const [data, setData] = useState(null); // Datos devueltos por el endpoint
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/evaluations/${id}/${user.id}/status`);
          setData(response.data);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id, user]);

  const getStatusColor = (estadoTarea) => {
    switch (estadoTarea) {
      case "Entregada":
        return "bg-green-100 text-green-700";
      case "Por entregar":
        return "bg-yellow-100 text-yellow-700";
      case "No entregada (cerrada)":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (estadoTarea) => {
    switch (estadoTarea) {
      case "Entregada":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "Por entregar":
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case "No entregada (cerrada)":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Filtrar evaluaciones según el estado
  const filteredEvaluations = data?.evaluations.filter(evaluation => {
    if (filter === "Todas") return true;
    return evaluation.estadoTarea === filter;
  });

  // Calcular progreso (porcentaje de evaluaciones entregadas)
  const totalEvaluations = data?.evaluations.length || 0;
  const entregadas = data?.evaluations.filter(e => e.estadoTarea === "Entregada").length || 0;
  const progreso = totalEvaluations ? (entregadas / totalEvaluations) * 100 : 0;

  // Evaluaciones próximas: aquellas "Por entregar" y cuya fecha de entrega sea en 3 días o menos
  const tareasProximas = data?.evaluations.filter(evaluation => {
    const dueDate = new Date(evaluation.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && evaluation.estadoTarea === "Por entregar";
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!data) {
    return <div className="text-center text-gray-500">No se encontraron datos para esta sección.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Información opcional de materia, profesor y plan de evaluación */}
      {data.materia && (
        <>
          <h1 className="text-2xl font-bold mb-4">Materia: {data.materia.name}</h1>
          <p className="text-gray-700 mb-2">Código: {data.materia.acronym}</p>
        </>
      )}
      {data.profesor && (
        <p className="text-gray-700 mb-2">
          Profesor: {data.profesor.firstName} {data.profesor.lastName}
        </p>
      )}
      {data.evaluationPlan && (
        <p className="text-gray-700 mb-4">
          Plan de evaluación: {data.evaluationPlan.name}
        </p>
      )}

      {/* Barra de progreso */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Progreso de tareas</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {entregadas} de {totalEvaluations} tareas entregadas
        </p>
      </div>

      {/* Notificaciones de tareas próximas */}
      {tareasProximas && tareasProximas.length > 0 && (
        <div className="mb-6 bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">¡Tareas próximas!</h2>
          <ul>
            {tareasProximas.map(evaluation => (
              <li key={evaluation._id} className="text-sm text-yellow-700">
                {evaluation.name} - Fecha de entrega: {new Date(evaluation.dueDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filtro por estado */}
      <div className="mb-6">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
          Filtrar por estado:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Todas">Todas</option>
          <option value="Entregada">Entregada</option>
          <option value="Por entregar">Por entregar</option>
          <option value="No entregada (cerrada)">No entregada (cerrada)</option>
        </select>
      </div>

      {/* Lista de evaluaciones */}
      <h2 className="text-xl font-semibold mb-4">Tareas</h2>
      <ul className="space-y-4">
        {filteredEvaluations.map(evaluation => (
          <li key={evaluation._id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{evaluation.name}</h3>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(evaluation.estadoTarea)}`}>
                {getStatusIcon(evaluation.estadoTarea)}
                <span>{evaluation.estadoTarea}</span>
              </div>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Fecha de entrega:</span>{" "}
                {new Date(evaluation.dueDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Ponderación:</span> {evaluation.weight}%
              </p>
              {evaluation.grade && (
                <p>
                  <span className="font-semibold">Calificación:</span> {evaluation.grade.score}
                </p>
              )}
            </div>
            {evaluation.estadoTarea === "Por entregar" && (
              <button
                onClick={() => navigate(`/estudiante/seccion/${id}/entregar-tarea/${evaluation._id}`)}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Entregar Tarea
              </button>
            )}
            {evaluation.estadoTarea === "Entregada" && evaluation.grade && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700">
                  Tarea entregada el {new Date(evaluation.grade.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
            {evaluation.estadoTarea === "No entregada (cerrada)" && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-700">La tarea está cerrada y no fue entregada.</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeccionDetalle;
