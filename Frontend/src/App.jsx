// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout que envuelve las rutas del administrador (Sidebar + main content)
import AdminLayout from './layouts/AdminLayout';

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


import TeachersPage from './pages/PRUEBA-profesores';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );*/
}

export default App;
