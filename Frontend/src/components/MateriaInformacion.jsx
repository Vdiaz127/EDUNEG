import { IoIosSkipBackward } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { LuGraduationCap } from "react-icons/lu";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0

const MateriaInformacion = ({
  codigo,
  nombre,
  descripcion,
  unidadesCredito,
<<<<<<< HEAD
}) => {
=======
  id,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/administrador/materias/editar/${id}`);
  };

>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
  return (
    <div className=" flex flex-col justify-center items-center h-screen m-5">
      {/* Informacion */}
      <div className="md:w-1/2  border-2 border-gray-200 rounded-lg shadow-lg py-8 px-5">
        <h1 className="mb-8 text-2xl font-bold text-center">
          Información de la Materia
        </h1>
        {/* Contenedor del codigo y el nombre */}
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap mb-4 gap-5">
          {/* Código */}
          <div className="w-full md:w-1/2 bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <FaCode color="blue" className="w-7 h-7" />
              Código
            </p>
            <p className="font-bold text-lg">{codigo}</p>
          </div>

          {/* Nombre */}
          <div className="w-full md:w-1/2 bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <FiBook color="green" className="w-7 h-7" />
              Nombre
            </p>
            <p className="font-bold text-lg">{nombre}</p>
          </div>
        </div>

        {/* Contenedor de la descripcion */}
        <div className="flex justify-between items-center mb-4 gap-5">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <GrDocumentText color="orange" className="w-6 h-6" />
              Descripción
            </p>
            <p className="font-bold text-lg">{descripcion}</p>
          </div>
        </div>

        {/* Contenedor de las unidades de credito */}
        <div className="flex justify-between items-center mb-4 gap-5">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex justify-between">
            <p className="text-lg font-semibold flex items-center gap-2">
              <LuGraduationCap color="purple" className="w-7 h-7" />
<<<<<<< HEAD
              Unideades de Credito
=======
              Unidades de Crédito
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
            </p>
            <p className="font-bold text-lg ml-2">{unidadesCredito}</p>
          </div>
        </div>
      </div>
      {/* Botones */}
      <div className="mt-4 w-1/2 flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/administrador/materias">
          <button className="bg-black text-white flex justify-center items-center gap-2 px-8 py-2 text-center rounded-md shadow-md cursor-pointer text-sm md:text-md">
            <IoIosSkipBackward className="w-5 h-5" />
            Regresar
          </button>
        </Link>
<<<<<<< HEAD
        <Link to="/administrador/materias/agregar">
          <button className="bg-gray-100 px-8 py-2 text-center border-2 border-gray-300 rounded-md shadow-md cursor-pointer text-sm md:text-md">
            Editar Materia
          </button>
        </Link>
=======
        <button
          onClick={handleEdit}
          className="bg-gray-100 px-8 py-2 text-center border-2 border-gray-300 rounded-md shadow-md cursor-pointer text-sm md:text-md"
        >
          Editar Materia
        </button>
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
      </div>
    </div>
  );
};

export default MateriaInformacion;
