<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa los componentes de página

import AdminPage from "./pages/Administrador/page";
import EstudiantesPage from "./pages/Administrador/Estudiantes/page";
import FormularioEstudiante from "./pages/Administrador/Estudiantes/AgregarEstudiante/page";
import VerEstudiante from "./pages/Administrador/Estudiantes/VerEstudiante/page";
import MateriasPage from "./pages/Administrador/Materias/page";
import FormularioMateria from "./pages/Administrador/Materias/AgregarMateria/page";
import VerMateria from "./pages/Administrador/Materias/VerMateria/page";
import ProfesoresPage from "./pages/Administrador/Profesores/page";
import FormularioProfesor from "./pages/Administrador/Profesores/AgregarProfesor/page";
import VerProfesor from "./pages/Administrador/Profesores/VerProfesor/page";
import PlanDeEvaluacion from "./pages/Profesor/page";
=======
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
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa los componentes de página

import AdminPage from './pages/Administrador/page';
import EstudiantesPage from './pages/Administrador/Estudiantes/page';
import FormularioEstudiante from './pages/Administrador/Estudiantes/AgregarEstudiante/page';
import VerEstudiante from './pages/Administrador/Estudiantes/VerEstudiante/page';
import MateriasPage from './pages/Administrador/Materias/page';
import FormularioMateria from './pages/Administrador/Materias/AgregarMateria/page';
import VerMateria from './pages/Administrador/Materias/VerMateria/page';
import ProfesoresPage from './pages/Administrador/Profesores/page';
import FormularioProfesor from './pages/Administrador/Profesores/AgregarProfesor/page';
import VerProfesor from './pages/Administrador/Profesores/VerProfesor/page';
>>>>>>> parent of 289013e (Agergando plan de evaluacion)

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Rutas del Administrador */}
        <Route path="/administrador" element={<AdminPage />} >
          {/* Rutas de estudiantes */}
          <Route path="estudiantes" element={<EstudiantesPage />} />
<<<<<<< HEAD
          <Route
            path="estudiantes/agregar"
            element={<FormularioEstudiante />}
          />
          <Route path="estudiantes/ver/:id" element={<VerEstudiante />} />
=======
        {/* Todas las rutas de /administrador usarán el AdminLayout */}
        <Route path="/administrador" element={<AdminLayout />}>
          {/* Página principal de administrador */}
          <Route index element={<AdminPage />} />
          {/* Rutas de estudiantes */}
          <Route path="estudiantes" element={<EstudiantesPage />} />
          <Route path="estudiantes/agregar" element={<FormularioEstudiante />} />
          <Route path="estudiantes/ver/:id" element={<VerEstudiante />} />
          <Route path="estudiantes/editar/:id" element={<EditarEstudiante />} />
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
=======
          <Route path="estudiantes/agregar" element={<FormularioEstudiante />} />
          <Route path="estudiantes/ver/:id" element={<VerEstudiante />} /> 
>>>>>>> parent of 289013e (Agergando plan de evaluacion)
          {/* Rutas de materias */}
          <Route path="materias" element={<MateriasPage />} />
          <Route path="materias/agregar" element={<FormularioMateria />} />
          <Route path="materias/ver/:id" element={<VerMateria />} />
<<<<<<< HEAD
=======
          <Route path="materias/editar/:id" element={<EditarMateria />} />
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
          {/* Rutas de profesores */}
          <Route path="profesores" element={<ProfesoresPage />} />
          <Route path="profesores/agregar" element={<FormularioProfesor />} />
          <Route path="profesores/ver/:id" element={<VerProfesor />} />
<<<<<<< HEAD
        </Route>

      </Routes>
    </BrowserRouter>
<<<<<<< HEAD

    
=======
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
        
      </Routes>
    </BrowserRouter>
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
=======
>>>>>>> parent of 289013e (Agergando plan de evaluacion)
  );
}

export default App;