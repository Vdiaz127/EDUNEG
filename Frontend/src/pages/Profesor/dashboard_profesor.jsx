import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function InicioProfesor() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [semestres, setSemestres] = useState([]);
  const [expandedSemestres, setExpandedSemestres] = useState({});
  const [loading, setLoading] = useState(true);
  const [evaluationPlans, setEvaluationPlans] = useState({}); // Guarda el estado de cada sección según su plan de evaluación

  const toggleSemestre = (id) => {
    setExpandedSemestres((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkEvaluationPlan = async (sectionId) => {
    try {
      const response = await axios.get(`/api/evaluation-plans/by-section?sectionId=${sectionId}`);
      // Si existe un plan, retorna el valor de isLocked, de lo contrario false
      if (response.data.length > 0) {
        return response.data[0].isLocked;
      }
      return false;
    } catch (error) {
      console.error("Error al verificar el plan de evaluación:", error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          // Consulta simple para obtener los semestres del profesor
          const response = await axios.get(`/api/professors/${user.id}/details`);
          setSemestres(response.data.semestres || []);

          // Verifica para cada sección si existe un plan de evaluación
          const plans = {};
          for (const semestre of response.data.semestres || []) {
            for (const seccion of semestre.secciones) {
              const isLocked = await checkEvaluationPlan(seccion.id);
              plans[seccion.id] = isLocked;
            }
          }
          setEvaluationPlans(plans);
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
          Esta es la vista de profesor. Aquí puedes ver en qué materias y secciones estás asignado.
        </p>

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
                    Semestre {semestre.periodo} - {semestre.año}
                  </h3>
                  {expandedSemestres[semestre.id] ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                {expandedSemestres[semestre.id] && (
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
                        </div>
                        <button
                          onClick={() => {
                            if (evaluationPlans[seccion.id]) {
                              navigate(`/profesor/plan-evaluacion/${seccion.id}/ver`);
                            } else {
                              navigate(`/profesor/plan-evaluacion/${seccion.id}`);
                            }
                          }}
                          className={`${
                            evaluationPlans[seccion.id]
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-green-500 hover:bg-green-600"
                          } text-white px-4 py-2 rounded-lg flex items-center transition-colors`}
                        >
                          {evaluationPlans[seccion.id] ? (
                            <>
                              <EyeIcon className="h-5 w-5 mr-2" />
                              Ver Plan de Evaluación
                            </>
                          ) : (
                            <>
                              <PlusIcon className="h-5 w-5 mr-2" />
                              Crear Plan de Evaluación
                            </>
                          )}
                        </button>
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
