import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserFormulario from "../../../components/UserFormulario";
import axios from "axios";


const EditarProfesor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        isActive: data.isActive === "true" || data.isActive === true
      };

      await axios.put(`/api/professors/${id}`, userData);
      
      
      navigate("/administrador/profesores");
    } catch (error) {
      console.error("Error al actualizar profesor:", error);
      
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!professor) return <div>Profesor no encontrado</div>;

  return (
    <UserFormulario 
      onSubmit={handleSubmit}
      rol="Profesor"
      initialData={{
        firstName: professor.firstName,
        lastName: professor.lastName,
        email: professor.email,
        isActive: professor.isActive
      }}
      isEditing={true}
      submitButtonText="Actualizar Profesor"
      returnUrl="/administrador/profesores"
    />
  );
};

export default EditarProfesor;
