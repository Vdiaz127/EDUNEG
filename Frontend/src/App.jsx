import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './components/context/UserContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ProfesorLayout from './layouts/ProfesorLayout';
import EstudianteLayout from './layouts/EstudiantesLayout';

// Páginas de Administrador
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
import EditarSeccion from './pages/Administrador/Secciones/EditarSeccion';

import SemestresPage from './pages/Administrador/Semestres/ListarSemestre';
import VerSemestre from './pages/Administrador/Semestres/VerSemestre';
import AgregarSemestre from './pages/Administrador/Semestres/AgregarSemestre';
import EditarSemestre from './pages/Administrador/Semestres/EditarSemestre';
import DetalleSeccion from './pages/Estudiante/DetalleSeccion';
import CarrerasPage from './pages/Administrador/Carreras/ListadoCarreras';
import FormularioCarrera from './pages/Administrador/Carreras/AgregarCarrera';
import VerCarrera from './pages/Administrador/Carreras/VerCarrera';
import EditarCarrera from './pages/Administrador/Carreras/Editarcarrera';
import PlanEvaluacionPage from "./pages/Profesor/PlanEvaluacionPage"; // Importa el nuevo componente
import VerPlanEvaluacion from './pages/Profesor/VerPlanEvaluacion.jsx';
// Páginas de Estudiante
import EstudiantePage from './pages/Estudiante/Inicioestudiante';

// Componentes de Login
import Login from './components/login/Login';
import Registro from './components/login/Registro';
// import CrearContrasena from './components/login/CrearContrasena';

// Páginas de Profesor
import InicioProfesor  from './pages/Profesor/dashboard_profesor';
import { Materia } from './pages/Profesor/materia';
import { Asignacion } from './pages/Profesor/asignacion';
import PlanEvaluacion from './pages/Profesor/PlanEvaluacion';
import SeccionesFormulario from './components/SeccionFormulario';


function App() {
  const { user, loading } = useContext(UserContext);

  // Mientras se valida el token, mostramos un loader global.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Cargando...
      </div>
    );
  }

  // Componente para proteger las rutas según el rol del usuario.
  const ProtectedRoute = ({ children, requiredRole }) => {
    // Al llegar aquí, ya se terminó la validación.
    if (!user) {
      // Si no hay usuario autenticado, redirige al login.
      return <Navigate to="/" />;
    }
    if (requiredRole && user.role !== requiredRole) {
      // Si el usuario no tiene el rol requerido, redirige a su dashboard.
      return <Navigate to={`/${user.role.toLowerCase()}`} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : (
              <Navigate to={`/${user.role.toLowerCase()}`} />
            )
          }
        />

        {/* Ruta de Primer Login */}
        <Route path="/registro" element={<Registro />} />


        {/* Rutas de Administrador */}
        <Route
          path="/administrador"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="estudiantes" element={<EstudiantesPage />} />
          <Route path="estudiantes/agregar" element={<FormularioEstudiante />} />
          <Route path="estudiantes/ver/:id" element={<VerEstudiante />} />
          <Route path="estudiantes/editar/:id" element={<EditarEstudiante />} />

          <Route path="materias" element={<MateriasPage />} />
          <Route path="materias/agregar" element={<FormularioMateria />} />
          <Route path="materias/ver/:id" element={<VerMateria />} />
          <Route path="materias/editar/:id" element={<EditarMateria />} />

          <Route path="profesores" element={<ProfesoresPage />} />
          <Route path="profesores/agregar" element={<FormularioProfesor />} />
          <Route path="profesores/ver/:id" element={<VerProfesor />} />
          <Route path="profesores/editar/:id" element={<EditarProfesor />} />

          <Route path="secciones" element={<SeccionesPage/>} />
          <Route path="secciones/ver/:id" element={<VerSeccion />} />
          <Route path="secciones/agregar" element={<SeccionesFormulario />} />
          <Route path="secciones/editar/:id" element={<EditarSeccion />} />

          <Route path="semestres" element={<SemestresPage />} />
          <Route path="semestres/ver/:id" element={<VerSemestre />} />
          <Route path="semestres/agregar" element={<AgregarSemestre />} />
          <Route path="semestres/editar/:id" element={<EditarSemestre />} />
          <Route path="carreras" element={<CarrerasPage />} />
          <Route path="carreras/agregar" element={<FormularioCarrera />} />
          <Route path="carreras/ver/:id" element={<VerCarrera />} />
          <Route path="carreras/editar/:id" element={<EditarCarrera />} />
        </Route>

        {/* Rutas de Profesor */}
        <Route
          path="/profesor"
          element={
            <ProtectedRoute requiredRole="Profesor">
              <ProfesorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InicioProfesor />} />
          <Route path="materia" element={<Materia />} />
          <Route path="asignacion" element={<Asignacion />} />
          <Route path="PlanEvaluacion" element={<PlanEvaluacion />} />
          <Route path="plan-evaluacion/:sectionId" element={<PlanEvaluacionPage />} />
          <Route path="plan-evaluacion/:sectionId/ver" element={<VerPlanEvaluacion />} />
        </Route>

        {/* Rutas de Estudiante */}
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute requiredRole="Estudiante">
              <EstudianteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EstudiantePage />} />
        </Route>

        {/* Ruta por defecto (Not Found) */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
