import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
<<<<<<< HEAD
/* 
Tabla para mostrar el listado de elementos (profesores, alumnos, materias, etc) recube las columnas, los datos, los estilos de la tabla, el placeholder y la funcion para filtrar la busqueda por promps. el promp route es para el boton de agregar
*/

const Tabla = ({
  columns,
  data,
=======

const Tabla = ({
  columns,
  data, 
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
  customStyles,
  buttontext,
  placeholder,
  filterFunction,
  rol,
}) => {
<<<<<<< HEAD
  const [isClient, setIsClient] = useState();
  const [records, setRecords] = useState(data);

=======
  const [records, setRecords] = useState(data);

  // Cada vez que la prop 'data' cambie, actualizamos el estado local
  useEffect(() => {
    setRecords(data);
  }, [data]);

  // Maneja la búsqueda filtrando sobre el array original
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
  const handleChange = (e) => {
    const filteredData = filterFunction(data, e.target.value);
    setRecords(filteredData);
  };

<<<<<<< HEAD
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  let link = "";
  if (rol.toLowerCase() === "profesores") {
    link = "/administrador/profesores/agregar";
  } else if (rol.toLowerCase() === "estudiantes") {
    link = "/administrador/estudiantes/agregar";
  } else {
    link = "/administrador/materias/agregar";
  }

  return (
    <div className="p-4 w-3/4">
      <h1 className="text-3xl font-semibold py-4">{rol}</h1>

      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-5 mb-4">
        {/* Input para la busqueda de elementos */}
        <input
          type="text"
          className="w-full md:w-80 h-10 p-2 border-2 border-gray-500 rounded-lg shadow-gray-300 shadow-md"
          placeholder={placeholder}
          onChange={handleChange}
        />
        {/* Boton para agregar un nuevo elemento */}
        <Link to={link}>
          <button className="mt-2 md:mt-0 p-2 h-10 bg-black text-white text-lg font-bold rounded-lg flex items-center justify-center shadow-gray-300 shadow-lg cursor-pointer">
            <FaPlus className="pr-2 w-5 h-5" />
            <p>{buttontext}</p>
=======
  // Mapeo de rutas para el botón "Agregar"
  const routeMap = {
    profesores: "/administrador/profesores/agregar",
    estudiantes: "/administrador/estudiantes/agregar",
    materias: "/administrador/materias/agregar",
    semestres: "/administrador/semestres/agregar"
  };

  const link = routeMap[rol.toLowerCase()] || "/administrador/materias/agregar";

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-semibold py-4">{rol}</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* Input para búsqueda */}
        <input
          type="text"
          className="w-full md:w-80 h-10 p-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          onChange={handleChange}
        />

        {/* Botón para agregar */}
        <Link to={link} className="w-full md:w-auto">
          <button className="w-full md:w-auto p-2 h-10 bg-black text-white text-lg font-bold rounded-lg flex items-center justify-center shadow-md hover:bg-gray-800 transition">
            <FaPlus className="mr-2 w-5 h-5" />
            <span>{buttontext}</span>
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
          </button>
        </Link>
      </div>

<<<<<<< HEAD
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={5}
      />
=======
      {/* Renderizado de la tabla o mensaje si no hay datos */}
      {records.length === 0 ? (
        <div className=" flex flex-col justify-center items-center p-2">
          <p >No hay datos disponibles.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
          />
        </div>
      )}
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
    </div>
  );
};

export default Tabla;
