import { Link } from "react-router-dom";

const AccionesAdmin = ({ ruta, color, texto, icono }) => {
  return (
    <Link to={ruta} className="flex flex-col items-center">
      <div
        className={`w-20 h-20 rounded-full shadow-md flex justify-center items-center ${color}`}
      >
        {icono}
      </div>
      <p className="font-semibold text-lg">{texto}</p>
    </Link>
  );
};

export default AccionesAdmin;