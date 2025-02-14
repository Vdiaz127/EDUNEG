import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrador</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <Link 
          to="/admin/usuarios" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-blue-600">Gestión de Usuarios</h2>
          <p className="text-gray-500">Administrar usuarios del sistema</p>
        </Link>
        
        <Link 
          to="/admin/materias" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-blue-600">Materias</h2>
          <p className="text-gray-500">Administrar materias y cursos</p>
        </Link>
        
        <Link 
          to="/admin/reportes" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-blue-600">Reportes</h2>
          <p className="text-gray-500">Generar informes del sistema</p>
        </Link>
      </div>
    </div>
  );
}