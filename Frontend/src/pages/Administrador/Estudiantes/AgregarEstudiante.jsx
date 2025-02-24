import UserFormulario from "../../../components/UserFormulario";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormularioEstudiante = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const userData = {
        ...data,
        role: "Estudiante",
        isActive: data.isActive === "true" || data.isActive === true
      };

      await axios.post("/api/students", userData);
      
      navigate("/administrador/estudiantes");
    } catch (error) {
      console.error("Error al crear estudiante:", error);
     
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <UserFormulario 
      onSubmit={handleSubmit} 
      role="Estudiante" 
      initialData={{
        firstName: "",
        lastName: "",
        email: "",
        isActive: "true"
      }}
      isEditing={false}
      submitButtonText="Crear Estudiante"
      returnUrl="/administrador/estudiantes"
    />
  );
};

export default FormularioEstudiante;
