import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import TablaGenerica from "../../../components/TablaGenerica";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { useEffect, useState } from "react";
import axios from "axios";

const ListadoMaterias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Usamos useNavigate

  // Función para obtener los datos de la API y guardarlos en el estado
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/subjects");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error al cargar las materias");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para eliminar una materia y luego actualizar el listado
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/subjects/${id}`);
      fetchData(); // Se actualizan los datos después de eliminar
    } catch (error) {
      console.error("Error deleting subject:", error);
      setError("Error al eliminar la materia");
    }
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
      sortable: true,
      center: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Unidades de crédito",
      selector: (row) => row.credits,
      center: true,
    },
    {
      name: "Acciones",
      center: true,
      cell: (row) => (
        <div className="flex space-x-2 md:space-x-8">
          <Link to={`/administrador/materias/ver/${row._id}`}>
            <FaEye className="cursor-pointer w-5 h-5" title="Ver" />
          </Link>
          <Link to={`/administrador/materias/editar/${row._id}`}>
            <FaEdit className="cursor-pointer w-5 h-5" title="Editar" />
          </Link>
          <FaTrash
            className="cursor-pointer w-5 h-5"
            title="Eliminar"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  // Función para filtrar la búsqueda en la tabla
  const filterFunction = (data, query) => {
    return data.filter((record) => {
      return (
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.code.toLowerCase().includes(query.toLowerCase())
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
      onAdd={() => navigate('/administrador/materias/agregar')} // Usamos navigate
      filterFunction={filterFunction}
      filterPlaceholder="Buscar por nombre o código"
    />
  );
};

export default ListadoMaterias;