import React, { useState, useContext } from "react";
import { MdMenu, MdClose, MdExitToApp } from "react-icons/md";
import MenuItems from "./MenuItems";
import { UserContext } from "../context/UserContext"; // Importa el contexto
import { useNavigate } from "react-router-dom"; // Para redireccionar después de cerrar sesión

export default function Sidebar({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext); // Obtén los datos del usuario y la función para cerrar sesión
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`relative ${className}`}>
      {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md opacity-90 hover:opacity-100 transition-opacity"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 shadow-lg`}
      >
        {/* Contenedor principal del Sidebar */}
        <div className="flex flex-col h-full">
          {/* Encabezado del Sidebar (Foto y nombre del usuario) */}
          <div className="flex flex-col items-center p-6 border-b border-gray-800">
            <img
              className="w-20 h-20 rounded-full mb-4 object-cover"
              src={user?.imgUrl || "https://picsum.photos/200"}
              alt="User profile"
            />
            <h2 className="text-xl font-semibold text-center">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-gray-400 text-center">{user?.email}</p>
          </div>

          {/* Ítems del menú */}
          <div className="flex-grow overflow-y-auto p-4">
            <MenuItems
              onItemSelected={toggleMenu}
              userType={user?.role} // Pasa el rol del usuario
            />
          </div>

          {/* Footer del Sidebar (Botón de cerrar sesión) */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              <MdExitToApp className="mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Capa de fondo oscurecida para pantallas pequeñas */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}