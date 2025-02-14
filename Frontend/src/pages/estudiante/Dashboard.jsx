import React from 'react';
import { Link } from 'react-router-dom';

export default function EstudianteDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Estudiante</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <Link 
          to="/estudiante/materias" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-purple-600">Mis Materias</h2>
          <p className="text-gray-500">Materias inscritas</p>
        </Link>
        
        <Link 
          to="/estudiante/notas" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-purple-600">Calificaciones</h2>
          <p className="text-gray-500">Consultar notas</p>
        </Link>
        
        <Link 
          to="/estudiante/horario" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-purple-600">Horario</h2>
          <p className="text-gray-500">Ver horario de clases</p>
        </Link>
      </div>
    </div>
  );
}