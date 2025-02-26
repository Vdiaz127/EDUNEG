import React, { useContext } from "react";
import { UserContext } from "../../components/context/UserContext"; // Importa el contexto de usuario
import Sidebar from "../../components/Sidebar/Sidebar"; // Importa el Sidebar
import { useNavigate } from "react-router-dom"; // Para redireccionar si el usuario no está autenticado

export default function Inicioestudiante() {
  const { user } = useContext(UserContext); // Obtén los datos del usuario desde el contexto
  const navigate = useNavigate();

  // Redirigir al login si el usuario no está autenticado
  if (!user) {
    navigate("/login");
    return null; // Evita renderizar el componente si no hay usuario
  }

  return (
    <div className="flex h-screen">

      {/* Contenido principal */}
      <div className="flex-grow p-6 overflow-y-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido, {user.firstName} {user.lastName}
        </h1>
        <p className="text-lg text-gray-700">
          Esta es la vista de estudiante. Aquí puedes ver tus cursos, calificaciones y más.
        </p>

        {/* Aquí puedes agregar más contenido específico para el estudiante */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tus Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Ejemplo de cursos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Matemáticas</h3>
              <p className="text-gray-600">Curso de matemáticas avanzadas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Ciencias</h3>
              <p className="text-gray-600">Curso de ciencias naturales.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Historia</h3>
              <p className="text-gray-600">Curso de historia universal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}