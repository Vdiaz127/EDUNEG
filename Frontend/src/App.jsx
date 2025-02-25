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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas del Administrador */}
        <Route path="/administrador" element={<AdminPage />}>
          {/* Rutas de estudiantes */}
          <Route path="estudiantes" element={<EstudiantesPage />} />
          <Route
            path="estudiantes/agregar"
            element={<FormularioEstudiante />}
          />
          <Route path="estudiantes/ver/:id" element={<VerEstudiante />} />
          {/* Rutas de materias */}
          <Route path="materias" element={<MateriasPage />} />
          <Route path="materias/agregar" element={<FormularioMateria />} />
          <Route path="materias/ver/:id" element={<VerMateria />} />
          {/* Rutas de profesores */}
          <Route path="profesores" element={<ProfesoresPage />} />
          <Route path="profesores/agregar" element={<FormularioProfesor />} />
          <Route path="profesores/ver/:id" element={<VerProfesor />} />
        </Route>

        <Route path="/profesor" element={<PlanDeEvaluacion />}></Route>
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
