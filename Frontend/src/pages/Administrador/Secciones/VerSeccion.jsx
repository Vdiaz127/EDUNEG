import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SeccionInformacion from "../../../components/SeccionInformacion";

const VerSeccion = () => {
  const { id } = useParams();
  const [seccion, setSeccion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeccion = async () => {
      try {
        const response = await axios.get(`/api/sections/${id}`);
        setSeccion(response.data);
      } catch (error) {
        console.error("Error al cargar la sección:", error);
        setError("Error al cargar la información de la sección");
      } finally {
        setLoading(false);
      }
    };

    fetchSeccion();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!seccion) return <div>Sección no encontrada</div>;

  return (
    <SeccionInformacion
      subjectId={seccion.subjectId}
      semesterId={seccion.semesterId}
      sectionNumber={seccion.sectionNumber}
      profesorId={seccion.profesorId}
      arrayStudents={seccion.arrayStudents}
      id={seccion._id}
    />
  );
};

export default VerSeccion;
