import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TablaGenerica from '../../../components/TablaGenerica';

const ListadoCarreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCarreras = async () => {
    try {
      const response = await axios.get('/api/careers');
      setCarreras(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener carreras:', error);
      setError('Error al cargar las carreras');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarreras();
  }, []);

  const columns = [
    {
      name: 'Nombre',
      selector: (row) => row.name,
    },
    {
      name: 'Descripción',
      selector: (row) => row.description,
    },
  ];

  const filterFunction = (data, query) => {
    if (!query) return data;
    return data.filter((record) => {
      return (
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <TablaGenerica
      columns={columns}
      data={carreras}
      title="Listado de Carreras"
      addButtonText="Agregar Carrera"
      onAdd={() => navigate('/administrador/carreras/agregar')}
      onEdit={(carrera) => navigate(`/administrador/carreras/editar/${carrera._id}`)}
      filterFunction={filterFunction}
      filterPlaceholder="Buscar por nombre o descripción..."
    />
  );
};

export default ListadoCarreras;