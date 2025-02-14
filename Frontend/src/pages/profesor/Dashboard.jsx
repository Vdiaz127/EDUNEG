import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfesorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Profesor</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <Link 
          to="/profesor/cursos" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-green-600">Mis Cursos</h2>
          <p className="text-gray-500">Gestionar materias asignadas</p>
        </Link>
        
        <Link 
          to="/profesor/calificaciones" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-green-600">Calificaciones</h2>
          <p className="text-gray-500">Registrar y consultar notas</p>
        </Link>
        
        <Link 
          to="/profesor/horario" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-green-600">Horario</h2>
          <p className="text-gray-500">Ver horario de clases</p>
        </Link>
      </div>
    </div>
  );
}