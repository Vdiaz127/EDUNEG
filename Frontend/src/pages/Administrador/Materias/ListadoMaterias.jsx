import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Tabla from "../../../components/Tabla";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardMaterias = () => {
  const [data, setData] = useState([]);

  // Función para obtener los datos de la API y guardarlos en el estado
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/subjects");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    }
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      name: "Codigo",
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

  // Estilos personalizados para la tabla
  const customStyles = {
    headRow: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        "@media (max-width: 640px)": {
          fontSize: "16px",
        },
      },
    },
    cells: {
      style: {
        fontWeight: "500",
        fontSize: "16px",
        textAlign: "center",
        justifyContent: "center",
        "@media (max-width: 640px)": {
          fontSize: "14px",
        },
      },
    },
  };

  // Función para filtrar la búsqueda en la tabla
  const filterFunction = (data, query) => {
    return data.filter((record) => {
      return (
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.code.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Tabla
        columns={columns}
        data={data} // Se pasa el array de datos obtenido desde el padre
        customStyles={customStyles}
        buttontext={"Agregar Materia"}
        placeholder={"Buscar por nombre o código"}
        filterFunction={filterFunction}
        rol={"Materias"}
      />
    </div>
  );
};

export default DashboardMaterias;
