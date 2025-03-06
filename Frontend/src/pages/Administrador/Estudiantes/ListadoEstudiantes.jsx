import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TablaGenerica from "../../../components/TablaGenerica";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ListadoEstudiantes = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      setError("Error al cargar los estudiantes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      setError("Error al eliminar el estudiante");
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      center: true,
    },
    {
      name: "Cédula",
      selector: (row) => row.cedula,
      sortable: true,
      center: true,
    },
    {
      name: "Correo electrónico",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Estatus",
      selector: (row) => (row.isActive ? "Activo" : "Inactivo"),
      center: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2 md:space-x-8">
          <button
            onClick={() => navigate(`/administrador/estudiantes/ver/${row.id}`)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye size={20} />
          </button>
          <button
            onClick={() => navigate(`/administrador/estudiantes/editar/${row.id}`)}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  const filterFunction = (data, query) => {
    return data.filter((record) => {
      return (
        record.firstName.toLowerCase().includes(query.toLowerCase()) ||
        record.lastName.toLowerCase().includes(query.toLowerCase()) ||
        record.email.toLowerCase().includes(query.toLowerCase()) ||
        record.cedula.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TablaGenerica
      columns={columns}
      data={students}
      title="Listado de Estudiantes"
      addButtonText="Agregar Estudiante"
      onAdd={() => navigate("/administrador/estudiantes/agregar")}
      filterFunction={filterFunction}
      filterPlaceholder="Buscar por nombre, cédula o correo"
    />
  );
};

export default ListadoEstudiantes;