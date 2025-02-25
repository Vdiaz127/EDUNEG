// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout que envuelve las rutas del administrador (Sidebar + main content)
import AdminLayout from './layouts/AdminLayout';
import ProfesorLayout from './layouts/ProfesorLayout';

// Importa los componentes de página
import AdminPage from './pages/Administrador/InicioAdministrador';

import EstudiantesPage from './pages/Administrador/Estudiantes/ListadoEstudiantes';
import FormularioEstudiante from './pages/Administrador/Estudiantes/AgregarEstudiante';
import VerEstudiante from './pages/Administrador/Estudiantes/VerEstudiante';
import EditarEstudiante from './pages/Administrador/Estudiantes/EditarEstudiante';

import MateriasPage from './pages/Administrador/Materias/ListadoMaterias';
import FormularioMateria from './pages/Administrador/Materias/AgregarMateria';
import EditarMateria from './pages/Administrador/Materias/EditarMateria';
import VerMateria from './pages/Administrador/Materias/VerMateria';

import ProfesoresPage from './pages/Administrador/Profesores/ListadoProfesores';
import FormularioProfesor from './pages/Administrador/Profesores/AgregarProfesor';
import VerProfesor from './pages/Administrador/Profesores/VerProfesor';
import EditarProfesor from './pages/Administrador/Profesores/EditarProfesor';

import SeccionesPage from './pages/Administrador/Secciones/ListadoSecciones';
import VerSeccion from './pages/Administrador/Secciones/VerSeccion';

import SemestresPage from './pages/Administrador/Semestres/ListarSemestre';
import VerSemestre from './pages/Administrador/Semestres/VerSemestre';
import AgregarSemestre from './pages/Administrador/Semestres/AgregarSemestre';
import EditarSemestre from './pages/Administrador/Semestres/EditarSemestre';


import Login from './components/login/login'; 

import { DashboardProfesor } from './pages/dashboard_profesor';
import { Materia } from './pages/materia';
import { Asignacion } from './pages/asignacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las rutas de /administrador usarán el AdminLayout */}
        <Route path="/administrador" element={<AdminLayout />}>
          {/* Página principal de administrador */}
          <Route index element={<AdminPage />} />
          {/* Rutas de estudiantes */}
          <Route path="estudiantes" element={<EstudiantesPage />} />
          <Route path="estudiantes/agregar" element={<FormularioEstudiante />} />
          <Route path="estudiantes/ver/:id" element={<VerEstudiante />} />
          <Route path="estudiantes/editar/:id" element={<EditarEstudiante />} />
          {/* Rutas de materias */}
          <Route path="materias" element={<MateriasPage />} />
          <Route path="materias/agregar" element={<FormularioMateria />} />
          <Route path="materias/ver/:id" element={<VerMateria />} />
          <Route path="materias/editar/:id" element={<EditarMateria />} />
          {/* Rutas de profesores */}
          <Route path="profesores" element={<ProfesoresPage />} />
          <Route path="profesores/agregar" element={<FormularioProfesor />} />
          <Route path="profesores/ver/:id" element={<VerProfesor />} />
          <Route path="profesores/editar/:id" element={<EditarProfesor />} />

          <Route path="secciones" element={<SeccionesPage />} />
          <Route path="secciones/ver/:id" element={<VerSeccion/>} />

          <Route path="semestres" element={<SemestresPage/>} />
          <Route path="semestres/ver/:id" element={<VerSemestre/>} />
          <Route path="semestres/agregar" element={<AgregarSemestre/>} />
          <Route path="semestres/editar/:id" element={<EditarSemestre/>} />

        </Route>

        <Route path="/profesor" element={<ProfesorLayout />} >
          
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />

        <Route path="/" element={<Login/>} />

  
        <Route path="/profesor" element={<DashboardProfesor />} />
        <Route path="/materia" element={<Materia />} />
        <Route path="/asignacion" element={<Asignacion />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
