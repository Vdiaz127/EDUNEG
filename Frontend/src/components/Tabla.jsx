import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
/* 
Tabla para mostrar el listado de elementos (profesores, alumnos, materias, etc) recube las columnas, los datos, los estilos de la tabla, el placeholder y la funcion para filtrar la busqueda por promps. el promp route es para el boton de agregar
*/

const Tabla = ({
  columns,
  data,
  customStyles,
  buttontext,
  placeholder,
  filterFunction,
  rol,
}) => {
  const [isClient, setIsClient] = useState();
  const [records, setRecords] = useState(data);

  const handleChange = (e) => {
    const filteredData = filterFunction(data, e.target.value);
    setRecords(filteredData);
  };

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
          </button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={5}
      />
    </div>
  );
};

export default Tabla;
