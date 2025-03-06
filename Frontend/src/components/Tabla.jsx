import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Tabla = ({
  columns,
  data, 
  customStyles,
  buttontext,
  placeholder,
  filterFunction,
  rol,
}) => {
  const [records, setRecords] = useState(data);

  // Cada vez que la prop 'data' cambie, actualizamos el estado local
  useEffect(() => {
    setRecords(data);
  }, [data]);

  // Maneja la búsqueda filtrando sobre el array original
  const handleChange = (e) => {
    const filteredData = filterFunction(data, e.target.value);
    setRecords(filteredData);
  };

  // Mapeo de rutas para el botón "Agregar"
  const routeMap = {
    profesores: "/administrador/profesores/agregar",
    estudiantes: "/administrador/estudiantes/agregar",
    materias: "/administrador/materias/agregar",
    semestres: "/administrador/semestres/agregar",
    secciones: "/administrador/secciones/agregar"
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
          </button>
        </Link>
      </div>

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
    </div>
  );
};

export default Tabla;
