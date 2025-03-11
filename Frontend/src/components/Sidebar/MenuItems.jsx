import React from "react";
import { MdHome, MdPeople, MdSchool, MdLibraryBooks, MdViewList, MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

function PanelItem({ panelName, Icon, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex justify-start mb-2 menuitem max-w-fit cursor-pointer"
    >
      <Icon className="icon-class text-white mr-3" />
      <h2 className="text-center text-white">{panelName}</h2>
    </Link>
  );
}

export default function MenuItems({ onItemSelected, userType = 'admin' }) {
  // Define los ítems de menú según el rol del usuario
  const routesByRole = {
    Administrador: [
      { panelName: 'Dashboard', icon: MdHome, path: '/administrador' },
      { panelName: 'Estudiantes', icon: MdSchool, path: '/administrador/estudiantes' },
      { panelName: 'Profesores', icon: MdPeople, path: '/administrador/profesores' },
      { panelName: 'Materias', icon: MdLibraryBooks, path: '/administrador/materias' },
      { panelName: 'Secciones', icon: MdViewList, path: '/administrador/secciones' },
      { panelName: 'Semestres', icon: MdDateRange, path: '/administrador/semestres' }
    ],
    
    Profesor: [
      { panelName: 'Dashboard', icon: MdHome, path: '/profesor' },
      { panelName: 'Mis Cursos', icon: MdSchool, path: '/profesor' },
    ],
    Estudiante: [
      { panelName: 'Dashboard', icon: MdHome, path: '/estudiante' },
      { panelName: 'Cursos', icon: MdSchool, path: '/estudiante/cursos' },
    ],
  };

  const routes = routesByRole[userType] || [];

  return (
    <div className="flex flex-col items-center containerMenu p-4 space-y-4">
      {routes.map((route, index) => (
        <div className='mt-1' key={index}>
          <PanelItem
            panelName={route.panelName}
            Icon={route.icon}
            to={route.path}
            onClick={onItemSelected}
          />
        </div>
      ))}
    </div>
  );
}