import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import axios from 'axios';

export default function Formulario() {
  const [newMateria, setNewMateria] = useState({
    nombre: '',
    descripcion: '',
    creditos: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMateria(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddMateria = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/materias', newMateria);
      
      if (response.data.success) {
        console.log('Materia creada exitosamente:', response.data.data);
        setNewMateria({
          nombre: '',
          descripcion: '',
          creditos: 0
        });
        alert('Materia creada exitosamente');
      }
    } catch (error) {
      console.error('Error al crear materia:', error);
      alert('Error al crear materia');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Nueva Materia
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleAddMateria}>
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre de la Asignatura
              </label>
              <div className="mt-1">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={newMateria.nombre}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ej: Matemáticas Avanzadas"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción de la Materia
              </label>
              <div className="mt-1">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  value={newMateria.descripcion}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe el contenido y objetivos de la materia"
                />
              </div>
            </div>

            <div>
              <label htmlFor="creditos" className="block text-sm font-medium text-gray-700">
                Unidades de Crédito
              </label>
              <div className="mt-1">
                <input
                  id="creditos"
                  name="creditos"
                  type="number"
                  min="1"
                  max="10"
                  value={newMateria.creditos}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Número de créditos"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button 
                type="button" 
                onClick={() => setNewMateria({nombre: '', descripcion: '', creditos: 0})}
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                Limpiar Formulario
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear Materia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
