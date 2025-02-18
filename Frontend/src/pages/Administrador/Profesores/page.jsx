import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
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
    selector: (row) => row.isArctive,
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
      <div className="flex space-x-2 md:space-x-8 ">
        <Link to="/administrador/profesores/ver/2">
          <FaEye className="cursor-pointer w-5 h-5" title="Ver" />
        </Link>

        <Link to="/administrador/profesores/agregar">
        <FaEdit className="cursor-pointer w-5 h-5" title="Editar" />
        </Link>
        <FaTrash className="cursor-pointer w-5 h-5" title="Eliminar" />
      </div>
    ),
  },
];
/* Datos de la tabla */
const data = [
  {
    nombre: "Juan Pérez",
    email: "jhonDoe@emaiñ.com",
    isActive: "Activo",
  },
  {
    nombre: "María Rodríguez",
    email: "jhonDoe@emaiñ.com",
    isActive: "Inactivo",
  },
  {
    nombre: "Carlos Martínez",
    email: "jhonDoe@emaiñ.com",
    isActive: "Activo",
  },
  {
    nombre: "Ana García",
    email: "jhonDoe@emaiñ.com",
    isActive: "Activo",
  },
  {
    nombre: "Pedro López",
    email: "jhonDoe@emaiñ.com",
    isActive: "Inactivo",
  },
  {
    nombre: "Sofía Fernández",
    email: "jhonDoe@emaiñ.com",
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
/* Funcion para filtrar las busquedas */
const filterFunction = (data, query) => {
  return data.filter((record) => {
    return (
      record.nombre.toLowerCase().includes(query.toLowerCase()) ||
      record.email.toLowerCase().includes(query.toLowerCase())
    );
  });
};

const Dashboard = () => {
  return (
    <div className="flex flex-col items-end">
      <Tabla
        columns={columns}
        data={data}
        customStyles={customStyles}
        buttontext={"Agregar Profesor"}
        placeholder={"Buscar por nombre o email"}
        filterFunction={filterFunction}
        rol={"Profesores"}
        responsive
      />
    </div>
  );
};

export default Dashboard;
