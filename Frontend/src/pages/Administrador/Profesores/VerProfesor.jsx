import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerProfesor = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await axios.get(`/api/professors/${id}`);
        setProfessor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener profesor:", error);
        setError("Error al cargar la información del profesor");
        setLoading(false);
      }
    };

    fetchProfessor();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!professor) return <div>Profesor no encontrado</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Información del Profesor</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Nombre:</label>
            <p>{professor.firstName}</p>
          </div>
          <div>
            <label className="font-semibold">Apellido:</label>
            <p>{professor.lastName}</p>
          </div>
          <div>
            <label className="font-semibold">Correo electrónico:</label>
            <p>{professor.email}</p>
          </div>
          <div>
            <label className="font-semibold">Estatus:</label>
            <p>{professor.isActive ? "Activo" : "Inactivo"}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/administrador/profesores"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerProfesor;