import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import MenuItems from './MenuItems';

export default function Sidebar({ className, userType, userName, userImg }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`relative ${className}`}>
      {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md opacity-60"
      >
        {isOpen ? <MdClose /> : <MdMenu />}
      </button>

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 h-screen w-60 bg-blue-700 text-white transform transition-transform duration-300 ease-in-out z-40 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
      >
        <MenuItems 
          onItemSelected={toggleMenu} 
          userType={userType} 
          userName={userName} 
          userImg={userImg} 
        />
      </nav>

      {/* Capa de fondo oscurecida para pantallas pequeñas */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-gray-600 opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}
