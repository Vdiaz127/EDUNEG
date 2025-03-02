import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosSkipBackward } from "react-icons/io";
import { BsBook } from "react-icons/bs";

const VerCarrera = () => {
  const { id } = useParams();
  const [carrera, setCarrera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        const response = await axios.get(`/api/careers/${id}`);
        setCarrera(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la carrera');
        setLoading(false);
      }
    };

    fetchCarrera();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!carrera) return <div>No se encontró la carrera</div>;

  return (
    <div className="flex flex-col justify-center items-center h-screen m-5">
      <div className="md:w-1/2 flex flex-col items-center text-center border-2 border-gray-200 rounded-lg shadow-lg py-8 px-5">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Información de la Carrera
        </h1>
        
        <div className="w-24 h-24 flex justify-center items-center border-2 border-gray-300 rounded-full shadow-md">
          <BsBook className="w-12 h-12 opacity-60" />
        </div>

        <div className="w-full md:w-4/5 items-center mb-4 mt-8">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
              Nombre
            </p>
            <p className="font-bold text-lg">
              {carrera.name}
            </p>
          </div>
        </div>

        <div className="w-full md:w-4/5 items-center mb-4">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
              Descripción
            </p>
            <p className="font-bold text-lg">
              {carrera.description}
            </p>
          </div>
        </div>

        <div className="w-full md:w-4/5 items-center mb-4">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
              Fecha de Creación
            </p>
            <p className="font-bold text-lg">
              {new Date(carrera.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="w-full md:w-4/5 items-center mb-4">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
              Última Actualización
            </p>
            <p className="font-bold text-lg">
              {new Date(carrera.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 w-1/2 flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/administrador/carreras">
          <button className="bg-black text-white flex justify-center items-center gap-2 px-8 py-2 text-center rounded-md shadow-md cursor-pointer">
            <IoIosSkipBackward className="w-5 h-5" />
            Regresar
          </button>
        </Link>
        
        <Link to={`/administrador/carreras/editar/${id}`}>
          <button className="bg-gray-100 px-8 py-2 text-center border-2 border-gray-300 rounded-md shadow-md cursor-pointer">
            Editar Carrera
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerCarrera;