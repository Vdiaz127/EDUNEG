import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import axios from 'axios'; // Si usas axios

export default function Inicioestudiante() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [semestres, setSemestres] = useState([]);
  const [semestresExpandidos, setSemestresExpandidos] = useState({});
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
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
      // Obtener los datos del estudiante desde el backend
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/students/${user.id}/details`); // Asegúrate de que la URL sea correcta
          const studentData = response.data;
  
          setSemestres(studentData.semestres);
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
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-grow p-6 overflow-y-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>
        <p className="text-lg text-gray-700">
          Esta es la vista de estudiante. Aquí puedes ver tus cursos, calificaciones y más.
        </p>

        {/* Resumen de Calificaciones */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Resumen de Calificaciones</h2>
          <p className="text-lg text-gray-700">
            Tu promedio actual es: <span className="font-bold">{promedio}</span>
          </p>
          <p className="text-lg text-gray-700">
            Próximo examen: <span className="font-bold">{proximoExamen}</span>
          </p>
        </div>

        {/* Lista de semestres inscritos */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tus Semestres Inscritos</h2>
          {semestres.map((semestre) => (
            <div key={semestre.id} className="mb-4">
              <div
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
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
                <div className="mt-2 pl-6">
                  {semestre.secciones.map((seccion) => (
                    <div
                      key={seccion.id}
                      className="bg-white p-4 rounded-lg shadow-md mt-2 hover:bg-gray-50 transition-colors"
                    >
                      <a
                        href={seccion.enlace}
                        className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                      >
                        {seccion.materia} / Sección {seccion.seccion}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        Profesor: {seccion.profesor}
                      </p>
                      <p className="text-sm text-gray-600">
                        Horario: {seccion.horario}
                      </p>
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