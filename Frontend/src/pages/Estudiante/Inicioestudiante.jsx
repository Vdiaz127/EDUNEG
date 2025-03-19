import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function Inicioestudiante() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [semestres, setSemestres] = useState([]);
  const [semestresExpandidos, setSemestresExpandidos] = useState({});
  const [loading, setLoading] = useState(true);
  const [promedio, setPromedio] = useState("N/A");
  const [proximoExamen, setProximoExamen] = useState("N/A");

  const toggleSemestre = (id) => {
    setSemestresExpandidos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/students/${user.id}/details`);
          const studentData = response.data;
          setSemestres(studentData.semestres || []);
          setPromedio(studentData.promedio);
          setProximoExamen(studentData.proximoExamen);
        } catch (error) {
          console.error("Error fetching student data:", error);
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
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Aquí puedes ver tus cursos, calificaciones y evaluaciones pendientes.
        </p>

        {/* Resumen de Calificaciones */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Resumen de Calificaciones</h2>
          <p className="text-lg text-gray-700">
            Tu promedio actual es: <span className="font-bold">{promedio}</span>
          </p>
          <p className="text-lg text-gray-700">
            Próximo examen: <span className="font-bold">{proximoExamen}</span>
          </p>
        </div>

        {/* Lista de Semestres */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tus Semestres Inscritos</h2>
          {semestres.map((semestre) => (
            <div key={semestre.id} className="mb-6">
              <div
                className="bg-white p-4 rounded-lg shadow cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleSemestre(semestre.id)}
              >
                <h3 className="text-xl font-bold">
                  Semestre {semestre.periodo} - {semestre.año}
                </h3>
                {semestresExpandidos[semestre.id] ? (
                  <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 text-gray-600" />
                )}
              </div>
              {semestresExpandidos[semestre.id] && (
                <div className="mt-2 pl-6 space-y-4">
                  {semestre.secciones.map((seccion) => (
                    <div
                      key={seccion.id}
                      className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                      <div className="mb-2">
                        <a
                          href={seccion.enlace}
                          className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {seccion.materia} / Sección {seccion.seccion}
                        </a>
                        <p className="text-sm text-gray-600">
                          Profesor: {seccion.profesor}
                        </p>
                      </div>
                      {/* Listado de Evaluaciones Pendientes */}
                      {seccion.pendingAssignments && seccion.pendingAssignments.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                          {seccion.pendingAssignments.map((assignment) => (
                            <li key={assignment._id} className="bg-gray-50 p-2 rounded">
                              <p className="font-semibold">{assignment.name}</p>
                              <p className="text-sm">
                                Fecha: {new Date(assignment.dueDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm">Peso: {assignment.weight}%</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">
                          No hay evaluaciones pendientes.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


