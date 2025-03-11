import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import axios from "axios";


export default function InicioProfesor() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [semestres, setSemestres] = useState([]);
  const [semestresExpandidos, setSemestresExpandidos] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleSemestre = (id) => {
    setSemestresExpandidos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (user) {
      // Obtener los datos del profesor desde el backend
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/professors/${user.id}/details`);
          // Suponemos que la respuesta tiene la siguiente estructura:
          // { semestres: [ { id, periodo, año, secciones: [ { id, materia, seccion, enlace } ] }, ... ] }
          const groupedSemestres = response.data.semestres.reduce((acc, semestre) => {
            const existingSemestre = acc.find(s => s.id === semestre.id);
            if (existingSemestre) {
              existingSemestre.secciones.push(...semestre.secciones);
            } else {
              acc.push(semestre);
            }
            return acc;
          }, []);
          setSemestres(groupedSemestres);
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
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="flex h-screen">

      <div className="flex-grow p-6 overflow-y-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>
        <p className="text-lg text-gray-700">
          Esta es la vista de profesor. Aquí puedes ver en qué materias y secciones
          estás asignado.
        </p>

        {/* Lista de semestres con sus secciones asignadas */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tus Semestres Asignados</h2>
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
                        {seccion.materia} / Sección {seccion.seccion}
                      
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
