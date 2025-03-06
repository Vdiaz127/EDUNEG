import { useParams, useNavigate } from "react-router-dom";
import SeccionFormulario from "../../../components/SeccionFormulario";
import axios from "axios";
import { useEffect, useState } from "react";

const EditarSeccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeccion = async () => {
      try {
        const response = await axios.get(`/api/sections/${id}`);
        setSeccion(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la sección:", error);
        setError("Error al cargar la información de la sección");
        setLoading(false);
      }
    };

    fetchSeccion();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/api/sections/${id}`, data);
      navigate("/administrador/secciones");
    } catch (error) {
      console.error("Error al actualizar la sección:", error);
      setError("Error al actualizar la sección");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!seccion) return <div>Sección no encontrada</div>;

  return (
    <SeccionFormulario
      onSubmit={handleSubmit}
      initialData={{
        subjectId: seccion.subjectId,
        semesterId: seccion.semesterId,
        sectionNumber: seccion.sectionNumber,
        profesorId: seccion.profesorId,
        arrayStudents: seccion.arrayStudents,
        id: seccion._id,
      }}
      isEditing={true}
      submitButtonText="Actualizar Sección"
      returnUrl="/administrador/secciones"
    />
  );
};

export default EditarSeccion;
