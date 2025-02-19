import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInformacion from "../../../components/UserInformacion";
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
    <UserInformacion 
      user={professor}
      rol="Profesor"
      returnUrl="/administrador/profesores"
    />
  );
};

export default VerProfesor;
