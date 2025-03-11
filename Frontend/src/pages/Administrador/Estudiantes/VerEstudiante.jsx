import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInformacion from "../../../components/UserInformacion";
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
    <><UserInformacion
      user={student}
      rol="Estudiante"
      returnUrl="/administrador/estudiantes" /><h1>Hola</h1></>
  );
};

export default VerEstudiante;
