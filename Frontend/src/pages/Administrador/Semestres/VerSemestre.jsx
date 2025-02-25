import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosSkipBackward } from "react-icons/io";
import { BsCalendarFill } from "react-icons/bs";
import { BsCalendar2Week } from "react-icons/bs";
import { BsCalendar2Month } from "react-icons/bs";

const VerSemestre = () => {
  const { id } = useParams();
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await axios.get(`/api/semesters/${id}`);
        setSemester(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar el semestre');
        setLoading(false);
      }
    };

    fetchSemester();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!semester) return <div>No se encontró el semestre</div>;

  return (
    <div className="flex flex-col justify-center items-center h-screen m-5">
      {/* Información */}
      <div className="md:w-1/2 flex flex-col items-center text-center border-2 border-gray-200 rounded-lg shadow-lg py-8 px-5">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Información del Semestre
        </h1>
        
        {/* Icono */}
        <div className="w-24 h-24 flex justify-center items-center border-2 border-gray-300 rounded-full shadow-md">
          <BsCalendarFill className="w-12 h-12 opacity-60" />
        </div>

        {/* Contenedor del Periodo */}
        <div className="w-full md:w-4/5 items-center mb-4 mt-8">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
              {/*<BsCalendar2Week className="w-7 h-7 text-blue-600" />*/}
              Periodo
            </p>
            <p className="font-bold text-lg">
              {semester.periodo}
            </p>
          </div>
        </div>

        {/* Contenedor del Año */}
        <div className="w-full md:w-4/5 items-center mb-4">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
              {/*<BsCalendar2Month className="w-7 h-7 text-green-600" />/>*/}
              Año
            </p>
            <p className="font-bold text-lg">
              {semester.año}
            </p>
          </div>
        </div>

        {/* Contenedor de la Fecha de Creación */}
        <div className="w-full md:w-4/5 items-center mb-4">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
               {/*<BsCalendar2Month className="w-7 h-7 text-orange-600" />/>*/}
              Fecha de Creación
            </p>
            <p className="font-bold text-lg">
              {new Date(semester.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Contenedor de la Última Actualización */}
        <div className="w-full md:w-4/5 items-center mb-4">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-2">
            <p className="text-lg font-semibold flex items-center gap-2">
               {/*<BsCalendar2Month className="w-7 h-7 text-purple-600" />*/}
              Última Actualización
            </p>
            <p className="font-bold text-lg">
              {new Date(semester.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-4 w-1/2 flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/administrador/semestres">
          <button className="bg-black text-white flex justify-center items-center gap-2 px-8 py-2 text-center rounded-md shadow-md cursor-pointer">
            <IoIosSkipBackward className="w-5 h-5" />
            Regresar
          </button>
        </Link>
        
        <Link to={`/administrador/semestres/editar/${id}`}>
          <button className="bg-gray-100 px-8 py-2 text-center border-2 border-gray-300 rounded-md shadow-md cursor-pointer">
            Editar Semestre
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerSemestre;
