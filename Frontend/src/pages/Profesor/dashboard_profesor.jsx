import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, UsersIcon, CalendarIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function InicioProfesor() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [semestres, setSemestres] = useState([]);
  const [semestresExpandidos, setSemestresExpandidos] = useState({});
  const [loading, setLoading] = useState(true);
  const [evaluationPlans, setEvaluationPlans] = useState({}); // Almacenar los planes de evaluación por sección

  const toggleSemestre = (id) => {
    setSemestresExpandidos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkEvaluationPlan = async (sectionId) => {
    try {
      const response = await axios.get(`/api/evaluation-plans/by-section?sectionId=${sectionId}`);
      console.log(`Respuesta para sección ${sectionId}:`, response.data); // Depuración
  
      // Si hay un plan de evaluación, devolver el estado de isLocked
      if (response.data.length > 0) {
        return response.data[0].isLocked; // Retorna true si el plan está bloqueado
      }
      return false; // Retorna false si no hay un plan de evaluación
    } catch (error) {
      console.error("Error al verificar el plan de evaluación:", error);
      return false; // Retorna false si hay un error
    }
  };
  

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          // Obtener los semestres del profesor
          const response = await axios.get(`/api/professors/${user.id}/details`);
          if (response.data && Array.isArray(response.data.semestres)) {
            const filteredSemestres = response.data.semestres.filter(
              (semestre) => semestre.status === "en curso" || semestre.status === "cerrado"
            );
            setSemestres(filteredSemestres);
  
            // Verificar si cada sección tiene un plan de evaluación y si está bloqueado
            const plans = {};
            for (const semestre of filteredSemestres) {
              for (const seccion of semestre.secciones) {
                const isLocked = await checkEvaluationPlan(seccion.id);
                plans[seccion.id] = isLocked;
                console.log(`Sección ${seccion.id} tiene plan bloqueado: ${isLocked}`); // Depuración
              }
            }
            setEvaluationPlans(plans);
          }
        } catch (error) {
          console.error("Error fetching professor data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }
  }, [user]);
  

  if (!user) {
    navigate("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-grow p-6 overflow-y-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Esta es la vista de profesor. Aquí puedes ver en qué materias y secciones
          estás asignado.
        </p>

        {/* Lista de semestres con sus secciones asignadas */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tus Semestres Asignados</h2>
          {semestres.length > 0 ? (
            semestres.map((semestre) => (
              <div key={semestre.id} className="mb-4">
                <div
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSemestre(semestre.id)}
                >
                  <h3 className="text-xl font-bold">
                    Semestre {semestre.periodo} - {semestre.año} ({semestre.status})
                  </h3>
                  {semestresExpandidos[semestre.id] ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-600" />
                  )}
                </div>

                {semestresExpandidos[semestre.id] && (
                  <div className="mt-2 pl-6">
                    {semestre.secciones.map((seccion) => (
                      <div
                        key={seccion.id}
                        className="bg-white p-4 rounded-lg shadow-md mt-2 hover:bg-gray-50 transition-colors flex justify-between items-center"
                      >
                        <div>
                          <h4 className="text-lg font-semibold">
                            {seccion.materia} / Sección {seccion.seccion}
                          </h4>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <UsersIcon className="h-4 w-4 mr-2" />
                            <span>Estudiantes: {seccion.studentCount}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>Evaluaciones pendientes: {seccion.pendingEvaluationsCount}</span>
                          </div>
                        </div>
                        {semestre.status === "en curso" && (
                          <button
                            onClick={() => {
                              if (evaluationPlans[seccion.id]) {
                                // Si ya tiene un plan, redirigir a la vista de observación
                                navigate(`/profesor/plan-evaluacion/${seccion.id}/ver`);
                              } else {
                                // Si no tiene un plan, redirigir a la vista de creación
                                navigate(`/profesor/plan-evaluacion/${seccion.id}`);
                              }
                            }}
                            className={`${evaluationPlans[seccion.id]
                                ? "bg-blue-500 hover:bg-blue-600" // Botón azul para "Ver Plan"
                                : "bg-green-500 hover:bg-green-600" // Botón verde para "Crear Plan"
                              } text-white px-4 py-2 rounded-lg flex items-center transition-colors`}
                          >
                            {evaluationPlans[seccion.id] ? (
                              <EyeIcon className="h-5 w-5 mr-2" /> // Icono de ojo para "Ver Plan"
                            ) : (
                              <PlusIcon className="h-5 w-5 mr-2" /> // Icono de más para "Crear Plan"
                            )}
                            {evaluationPlans[seccion.id] ? "Ver Plan de Evaluación" : "Crear Plan de Evaluación"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay semestres asignados.</p>
          )}
        </div>
      </div>
    </div>
  );
}