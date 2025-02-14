import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar páginas
import Login from './pages/Login';
import Registro from './pages/Registro';  // Asegúrate de que la importación sea correcta
import AdminDashboard from './pages/admin/Dashboard';
import ProfesorDashboard from './pages/profesor/Dashboard';
import EstudianteDashboard from './pages/estudiante/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />  {/* Añadir esta línea */}
        
        {/* Rutas de Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Rutas de Profesor */}
        <Route path="/profesor/dashboard" element={<ProfesorDashboard />} />
        
        {/* Rutas de Estudiante */}
        <Route path="/estudiante/dashboard" element={<EstudianteDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;