import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, CalendarIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export default function DetalleSeccion() {
  const { sectionId } = useParams(); // Obtener el ID de la sección desde la URL
  const navigate = useNavigate(); // Para redirigir al usuario si es necesario

  // Datos estáticos de ejemplo
  const seccion = {
    _id: "section1",
    subjectId: "MAT101",
    sectionNumber: "01",
    profesorId: "Profesor Juan Pérez",
    semesterId: "Semestre 2023-1",
  };

  const evaluationPlan = {
    _id: "evaluationPlan1",
    name: "Plan de Evaluación MAT101",
    status: "Activo",
    startDate: "2023-10-01",
    endDate: "2023-12-15",
  };

  const evaluations = [
    {
      _id: "evaluation1",
      name: "Tarea 1 - Álgebra Lineal",
      dueDate: "2023-10-15",
      weight: 20,
      documentLink: "#",
      status: "Pendiente", // Estado de la tarea
    },
    {
      _id: "evaluation2",
      name: "Examen Parcial - Cálculo",
      dueDate: "2023-11-10",
      weight: 30,
      documentLink: "#",
      status: "Entregado", // Estado de la tarea
    },
    {
      _id: "evaluation3",
      name: "Proyecto Final - Geometría",
      dueDate: "2023-12-05",
      weight: 50,
      documentLink: "#",
      status: "Pendiente", // Estado de la tarea
    },
  ];

  // Función para manejar la entrega de una tarea
  const handleEntregarTarea = (evaluationId) => {
    alert(`Entregando tarea con ID: ${evaluationId}`);
    // Aquí puedes agregar la lógica para enviar la tarea al backend
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Detalle de la Sección</h1>

      {/* Tarjeta de la Sección */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <AcademicCapIcon className="h-6 w-6 mr-2 text-blue-600" />
          {seccion.subjectId} - Sección {seccion.sectionNumber}
        </h2>
        <div className="space-y-2">
          <p className="text-lg text-gray-700 flex items-center">
            <span className="font-semibold mr-2">Profesor:</span> {seccion.profesorId}
          </p>
          <p className="text-lg text-gray-700 flex items-center">
            <span className="font-semibold mr-2">Semestre:</span> {seccion.semesterId}
          </p>
        </div>
      </div>

      {/* Tarjeta del Plan de Evaluación */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <DocumentTextIcon className="h-6 w-6 mr-2 text-blue-600" />
          Plan de Evaluación
        </h2>
        {evaluationPlan ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">Nombre:</span>
              <span className="text-gray-600">{evaluationPlan.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">Estado:</span>
              <span className="text-gray-600">{evaluationPlan.status}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-semibold text-gray-700 mr-2">Fecha de inicio:</span>
              <span className="text-gray-600">
                {new Date(evaluationPlan.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-semibold text-gray-700 mr-2">Fecha de fin:</span>
              <span className="text-gray-600">
                {new Date(evaluationPlan.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-700">No hay un plan de evaluación asociado.</p>
        )}
      </div>

      {/* Lista de Tareas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <ClockIcon className="h-6 w-6 mr-2 text-blue-600" />
          Tareas
        </h3>
        {evaluations.length > 0 ? (
          evaluations.map((evaluation) => (
            <div
              key={evaluation._id}
              className="mb-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                {evaluation.name}
              </h4>
              <div className="mt-2 space-y-2">
                <p className="text-gray-700 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-semibold">Fecha de entrega:</span>{" "}
                  <span className="ml-1">
                    {new Date(evaluation.dueDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-semibold">Peso:</span>{" "}
                  <span className="ml-1">{evaluation.weight}%</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-semibold">Estado:</span>{" "}
                  <span
                    className={`ml-1 font-semibold ${
                      evaluation.status === "Pendiente" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {evaluation.status}
                  </span>
                </p>
              </div>
              {evaluation.status === "Pendiente" && (
                <button
                  onClick={() => handleEntregarTarea(evaluation._id)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Entregar Tarea
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-700">No hay tareas en este plan de evaluación.</p>
        )}
      </div>
    </div>
  );
}