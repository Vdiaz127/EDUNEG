import { IoIosSkipBackward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const UserInformacion = ({ user, rol, returnUrl }) => {
  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen m-5">
      {/* Informacion */}
      <div className="md:w-1/2 flex flex-col items-center text-center border-2 border-gray-200 rounded-lg shadow-lg py-8 px-5">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Información del {rol}
        </h1>
        {/* Foto */}
        <div className="w-24 h-24 flex justify-center items-center border-2 border-gray-300 rounded-full shadow-md">
          {rol === "Profesor" ? (
            <FaRegUser className="w-12 h-12 opacity-60" />
          ) : (
            <PiStudentBold className="w-12 h-12 opacity-60" />
          )}
        </div>
        {/* Estatus */}
        <div
          className={`text-sm font-bold mt-2 mb-8 px-2 rounded-md ${
            user.estatus ? "bg-green-300 text-green-700" : "bg-red-300 text-red-700"
          }`}
        >
          {user.estatus ? "Activo" : "Inactivo"}
        </div>

        {/* Contenedor del nombre */}
        <div className="w-full md:w-4/5 items-center mb-4 gap-5">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2 ">
              <FaRegAddressCard color="blue" className="w-7 h-7" />
              Nombre
            </p>
            <p className="font-bold text-lg">
              {user.nombre} {user.apellido}
            </p>
          </div>
        </div>

        {/* Contenedor del Email */}
        <div className="w-full md:w-4/5 items-center mb-4 gap-5">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2 ">
              <MdOutlineEmail color="green" className="w-7 h-7" />
              Email
            </p>
            <p className="font-bold text-lg ">{user.email}</p>
          </div>
        </div>
      </div>
      {/* Botones */}
      <div className="mt-4 w-1/2 flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to={returnUrl}>
          <button className="bg-black text-white flex justify-center items-center gap-2 px-8 py-2 text-center rounded-md shadow-md cursor-pointer">
            <IoIosSkipBackward className="w-5 h-5" />
            Regresar
          </button>
        </Link>

        <Link to={`${returnUrl}/editar/${user._id}`}>
          <button className="bg-gray-100 px-8 py-2 text-center border-2 border-gray-300 rounded-md shadow-md cursor-pointer">
            Editar Perfil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserInformacion;
