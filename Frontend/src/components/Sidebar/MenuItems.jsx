import './MenuItems.css';
import { MdHome, MdPeople, MdSchool, MdLibraryBooks } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Profile({ nombre, imgUrl }) {
  return (
    <div className="flex flex-col items-center mb-11">
      <img className="imgRedonda" src={imgUrl} alt="profile" />
      <h3 className="mt-2 text-center text-white">
        <b>{nombre}</b>
      </h3>
    </div>
  );
}

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

export default function MenuItems({ onItemSelected, userType = 'admin', userName, userImg }) {
  // Define los ítems de menú según el rol del usuario
  const routesByRole = {
    admin: [
      { panelName: 'Dashboard', icon: MdHome, path: '/administrador' },
      { panelName: 'Estudiantes', icon: MdSchool, path: '/administrador/estudiantes' },
      { panelName: 'Profesores', icon: MdPeople, path: '/administrador/profesores' },
      { panelName: 'Materias', icon: MdLibraryBooks, path: '/administrador/materias' },
    ],
    teacher: [
      { panelName: 'Dashboard', icon: MdHome, path: '/profesor' },
      { panelName: 'Mis Cursos', icon: MdSchool, path: '/profesor' },
    ],
    student: [
      { panelName: 'Dashboard', icon: MdHome, path: '/dashboard' },
      { panelName: 'Cursos', icon: MdSchool, path: '/courses' },
    ],
  };

  const routes = routesByRole[userType] || [];

  return (
    <div className="flex flex-col items-center containerMenu p-4 space-y-4">
      <Profile 
        nombre={userName || 'Usuario'} 
        imgUrl={userImg || 'https://picsum.photos/200'} 
      />
      {routes.map((route, index) => (
        <div className='mt-1' key={index}>
            <PanelItem
                key={index}
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
