import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserFormulario from "../../../components/UserFormulario";
import axios from "axios";


const AgregarProfesor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      // Asegurarnos de que el estatus se maneje correctamente
      const userData = {
        ...data,
        role: "Profesor",
        isActive: data.isActive === "true" || data.isActive === true
      };

      await axios.post('/api/professors', userData);
      
      navigate("/administrador/profesores");
    } catch (error) {
      console.error("Error al agregar profesor:", error);
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <UserFormulario 
      onSubmit={handleSubmit}
      rol="Profesor"
      initialData={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isActive: "true"
      }}
      isEditing={false}
      submitButtonText="Crear Profesor"
      returnUrl="/administrador/profesores"
    />
  );
};

export default AgregarProfesor;
