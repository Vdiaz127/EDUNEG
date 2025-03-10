// ListarSemestre.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TablaGenerica from '../../../components/TablaGenerica';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

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

  const handleDelete = async (id, status) => {
    if (status === 'en curso' || status === 'cerrado') {
      alert('No se puede eliminar un semestre en curso o cerrado.');
      return;
    }

    try {
      await axios.delete(`/api/semesters/${id}`);
      fetchSemesters(); // Recargar la lista de semestres
    } catch (error) {
      console.error('Error al eliminar el semestre:', error);
      setError('Error al eliminar el semestre');
    }
  };

  const handleChangeStatus = async (id, currentStatus) => {
    let newStatus;
    if (currentStatus === 'abierto') {
      newStatus = 'en curso';
    } else if (currentStatus === 'en curso') {
      newStatus = 'cerrado';
    } else {
      alert('No se puede cambiar el estado de un semestre cerrado.');
      return;
    }

    try {
      await axios.put(`/api/semesters/${id}/status`, { status: newStatus });
      fetchSemesters(); // Recargar la lista de semestres
    } catch (error) {
      console.error('Error al cambiar el estado del semestre:', error);
      setError('Error al cambiar el estado del semestre');
    }
  };

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
    {
      name: 'Acciones',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/administrador/semestres/editar/${row._id}`)}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id, row.status)}
            className="text-red-500 hover:text-red-600"
            disabled={row.status === 'en curso' || row.status === 'cerrado'}
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleChangeStatus(row._id, row.status)}
            className="text-green-500 hover:text-green-600"
            disabled={row.status === 'cerrado'}
          >
            <FaCheckCircle />
          </button>
        </div>
      ),
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