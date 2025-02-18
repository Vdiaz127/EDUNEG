import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Tabla from "../../../components/Tabla";
import { Link } from "react-router-dom";

/* Cabeceras de la tabla */
const columns = [
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    sortable: true,
    center: "true",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    center: "true",
  },
  {
    name: "Estatus",
    center: "true",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div
        style={{
          backgroundColor: row.isActive === "Activo" ? "#7FF8AA" : "#FECACA",
          color: row.isActive === "Activo" ? "#166534" : "#991B1B",
          width: "5rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.25rem",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {row.isActive}
      </div>
    ),
  },
  {
    name: "Acciones",
    center: "true",
    cell: (row) => (
      <div className="flex space-x-2 md:space-x-8">
        <Link to={`/administrador/estudiantes/ver/${row.id || 2}`}>
          <FaEye className="cursor-pointer w-4 h-4 md:w-5 md:h-5" title="Ver" />
        </Link>
        <Link to="/administrador/estudiantes/agregar">
          <FaEdit className="cursor-pointer w-4 h-4 md:w-5 md:h-5" title="Editar" />
        </Link>
        <FaTrash className="cursor-pointer w-4 h-4 md:w-5 md:h-5" title="Eliminar" />
      </div>
    ),
  },
];

/* Datos de la tabla */
const data = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "jhonDoe@email.com",
    isActive: "Activo",
  },
  {
    id: 2,
    nombre: "María Rodríguez",
    email: "jhonDoe@email.com",
    isActive: "Inactivo",
  },
  {
    id: 3,
    nombre: "Carlos Martínez",
    email: "jhonDoe@email.com",
    isActive: "Activo",
  },
  {
    id: 4,
    nombre: "Ana García",
    email: "jhonDoe@email.com",
    isActive: "Activo",
  },
  {
    id: 5,
    nombre: "Pedro López",
    email: "jhonDoe@email.com",
    isActive: "Inactivo",
  },
  {
    id: 6,
    nombre: "Sofía Fernández",
    email: "jhonDoe@email.com",
    isActive: "Activo",
  },
];

/* Estilos para la tabla */
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

/* Función para filtrar las búsquedas */
const filterFunction = (data, query) => {
  return data.filter((record) => {
    return (
      record.nombre.toLowerCase().includes(query.toLowerCase()) ||
      record.email.toLowerCase().includes(query.toLowerCase())
    );
  });
};

const DashboardEstudiantes = () => {
  return (
    <div className="flex flex-col items-end">
      <Tabla
        columns={columns}
        data={data}
        customStyles={customStyles}
        buttontext="Agregar Estudiante"
        placeholder="Buscar por nombre o email"
        filterFunction={filterFunction}
        rol="Estudiantes"
        responsive 
      />
    </div>
  );
};


export default DashboardEstudiantes;
