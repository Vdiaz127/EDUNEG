import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TablaGenerica from '../../../components/TablaGenerica';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ListadoMaterias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/subjects');
      console.log(response.data); // Verifica la estructura de los datos
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar las materias');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para eliminar una materia
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/subjects/${id}`);
      fetchData(); // Actualizar los datos después de eliminar
    } catch (error) {
      console.error('Error deleting subject:', error);
      setError('Error al eliminar la materia');
    }
  };

  // Definición de las columnas
  const columns = [
    {
      name: "Código",
      selector: (row) => row.acronym || 'N/A', // Si no hay código, muestra 'N/A'
      sortable: true,
      center: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name || 'N/A', // Si no hay nombre, muestra 'N/A'
      sortable: true,
      center: true,
    },
    {
      name: "Unidades de crédito",
      selector: (row) => row.credits || 'N/A', // Si no hay créditos, muestra 'N/A'
      center: true,
    },
    {
      name: "Carrera",
      selector: (row) => row.careerId?.name || 'N/A', // Accede a careerId.name
      center: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2 md:space-x-8">
          <button
            onClick={() => navigate(`/administrador/materias/ver/${row._id}`)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye size={20} />
          </button>
          <button
            onClick={() => navigate(`/administrador/materias/editar/${row._id}`)}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  // Función para filtrar la búsqueda en la tabla
  const filterFunction = (data, query) => {
    return data.filter((record) => {
      return (
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.code.toLowerCase().includes(query.toLowerCase()) ||
        record.careerId?.name.toLowerCase().includes(query.toLowerCase()) // Filtrar por nombre de carrera
      );
    });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TablaGenerica
      columns={columns}
      data={data}
      title="Listado de Materias"
      addButtonText="Agregar Materia"
      onAdd={() => navigate('/administrador/materias/agregar')}
      filterFunction={filterFunction}
      filterPlaceholder="Buscar por nombre, código o carrera"
    />
  );
};

export default ListadoMaterias;