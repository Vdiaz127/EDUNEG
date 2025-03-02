import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TablaGenerica from '../../../components/TablaGenerica';

const ListarSemestre = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSemesters = async () => {
    try {
      const response = await axios.get('/api/semesters');
      setSemesters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener semestres:', error);
      setError('Error al cargar los semestres');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const columns = [
    {
      name: 'Periodo',
      selector: (row) => row.periodo,
    },
    {
      name: 'Año',
      selector: (row) => row.año,
    },
    {
      name: 'Fecha de Inicio',
      selector: (row) => new Date(row.fechaInicio).toLocaleDateString(),
    },
    {
      name: 'Fecha de Fin',
      selector: (row) => new Date(row.fechaFin).toLocaleDateString(),
    },
    {
      name: 'Estado',
      selector: (row) => row.status,
    },
  ];

  const filterFunction = (data, query) => {
    if (!query) return data;
    return data.filter((record) => {
      return (
        record.periodo.toString().toLowerCase().includes(query.toLowerCase()) ||
        record.año.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <TablaGenerica
      columns={columns}
      data={semesters}
      title="Listado de Semestres"
      addButtonText="Agregar Semestre"
      onAdd={() => navigate('/administrador/semestres/agregar')}
      onEdit={(semester) => navigate(`/administrador/semestres/editar/${semester._id}`)}
      filterFunction={filterFunction}
      filterPlaceholder="Buscar por periodo o año..."
    />
  );
};

export default ListarSemestre;