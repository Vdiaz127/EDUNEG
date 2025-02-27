import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/context/UserContext"; // Importa el contexto de usuario
import Sidebar from "../../components/Sidebar/Sidebar"; // Importa el Sidebar
import { useNavigate } from "react-router-dom"; // Para redireccionar si el usuario no está autenticado
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"; // Iconos para el acordeón

export default function Inicioestudiante() {
  const { user } = useContext(UserContext); // Obtén los datos del usuario desde el contexto
  const navigate = useNavigate();

  // Estado para almacenar los semestres y secciones inscritas
  const [semestres, setSemestres] = useState([]);

  // Estado para controlar qué semestres están expandidos
  const [semestresExpandidos, setSemestresExpandidos] = useState({});

  // Función para alternar la expansión de un semestre
  const toggleSemestre = (id) => {
    setSemestresExpandidos((prev) => ({
      ...prev,
      [id]: !prev[id], // Si estaba expandido, lo colapsa, y viceversa
    }));
  };

  // Simulación de datos de semestres y secciones inscritas
  useEffect(() => {
    // Aquí deberías hacer una llamada a la API para obtener los semestres y secciones del estudiante
    // Por ahora, usaremos datos de prueba
    const datosDePrueba = [
      {
        id: 1,
        periodo: 1,
        año: 2023,
        secciones: [
          {
            id: 1,
            materia: "Matemáticas Básicas",
            codigo: "MAT101",
            seccion: "001",
            profesor: "Juan Pérez",
            horario: "Lunes y Miércoles, 10:00 AM - 12:00 PM",
            enlace: "/seccion/MAT101-001",
          },
          {
            id: 2,
            materia: "Física General",
            codigo: "FIS101",
            seccion: "002",
            profesor: "María Gómez",
            horario: "Martes y Jueves, 2:00 PM - 4:00 PM",
            enlace: "/seccion/FIS101-002",
          },
        ],
      },
      {
        id: 2,
        periodo: 2,
        año: 2023,
        secciones: [
          {
            id: 3,
            materia: "Programación I",
            codigo: "PROG101",
            seccion: "001",
            profesor: "Carlos López",
            horario: "Lunes y Viernes, 8:00 AM - 10:00 AM",
            enlace: "/seccion/PROG101-001",
          },
        ],
      },
    ];

    setSemestres(datosDePrueba);
  }, []);

  // Redirigir al login si el usuario no está autenticado
  if (!user) {
    navigate("/login");
    return null; // Evita renderizar el componente si no hay usuario
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
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
            Tu promedio actual es: <span className="font-bold">8.5</span>
          </p>
          <p className="text-lg text-gray-700">
            Próximo examen: <span className="font-bold">Matemáticas Básicas - 15 de Abril</span>
          </p>
        </div>

        {/* Lista de semestres inscritos */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tus Semestres Inscritos</h2>
          {semestres.map((semestre) => (
            <div key={semestre.id} className="mb-4">
              {/* Encabezado del semestre (acordeón) */}
              <div
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleSemestre(semestre.id)}
              >
                <h3 className="text-xl font-bold">
                  Semestre {semestre.periodo} - {semestre.año}
                </h3>
                {/* Icono de flecha (abajo o arriba según el estado) */}
                {semestresExpandidos[semestre.id] ? (
                  <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 text-gray-600" />
                )}
              </div>

              {/* Lista de secciones inscritas en este semestre (se muestra solo si está expandido) */}
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