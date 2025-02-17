import { Link } from "react-router-dom";

const CardAdmin = ({ ruta, titulo, imagen, cantidad, isFullWidth }) => {
  const widthClass = isFullWidth ? "w-4/5" : "w-1/2";

  return (
    <Link to={ruta} className={`w-full md:${widthClass} bg-white rounded-xl shadow-md overflow-hidden`}>
      <div>
        <div className="relative h-16 md:h-32">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={imagen}
            alt={titulo}
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{titulo}</h2>
          <p className="text-4xl font-extrabold text-gray-900 text-right">
            {cantidad}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardAdmin;
