import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerEstudiante = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener estudiante:", error);
        setError("Error al cargar la información del estudiante");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!student) return <div>Estudiante no encontrado</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Información del Estudiante</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Nombre:</label>
            <p>{student.firstName}</p>
          </div>
          <div>
            <label className="font-semibold">Apellido:</label>
            <p>{student.lastName}</p>
          </div>
          <div>
            <label className="font-semibold">Cédula:</label>
            <p>{student.cedula}</p>
          </div>
          <div>
            <label className="font-semibold">Correo electrónico:</label>
            <p>{student.email}</p>
          </div>
          <div>
            <label className="font-semibold">Estatus:</label>
            <p>{student.isActive ? "Activo" : "Inactivo"}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/administrador/estudiantes"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerEstudiante;
