import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Tabla from "../../../components/Tabla";
import { Link } from "react-router-dom";

/* Cabeceras de la tabla */
const columns = [
  {
    name: "Codigo",
    selector: (row) => row.codigo,
    sortable: true,
    center: true,
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    sortable: true,
    center: true,
  },
  {
    name: "Unidades de credito",
    selector: (row) => row.unidadesCredito,
    center: true,
  },
  {
    name: "Acciones",
    center: true,
    cell: (row) => (
      <div className="flex space-x-2 md:space-x-8 ">

        <Link to="/administrador/materias/ver/2">
          <FaEye className="cursor-pointer w-5 h-5" title="Ver" />
        </Link>

        <Link to="/administrador/materias/agregar">
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
    codigo: "MAT-101",
    nombre: "Matemáticas Básicas",
    unidadesCredito: 3,
  },
  {
    codigo: "FIS-101",
    nombre: "Física General",
    unidadesCredito: 4,
  },
  {
    codigo: "QUI-101",
    nombre: "Química Introductoria",
    unidadesCredito: 4,
  },
  {
    codigo: "INF-101",
    nombre: "Introducción a la Informática",
    unidadesCredito: 3,
  },
  {
    codigo: "LIT-101",
    nombre: "Literatura Universal",
    unidadesCredito: 2,
  },
  {
    codigo: "HIS-101",
    nombre: "Historia del Mundo",
    unidadesCredito: 3,
  },
  {
    codigo: "ECO-101",
    nombre: "Principios de Economía",
    unidadesCredito: 3,
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
      record.codigo.toLowerCase().includes(query.toLowerCase())
    );
  });
};

const DashboardMaterias = () => {
  return (
    <div className="flex flex-col items-end">
      <Tabla
        columns={columns}
        data={data}
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
