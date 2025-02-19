import UserFormulario from "../../../components/UserFormulario";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast.success("Estudiante creado exitosamente");
      navigate("/administrador/estudiantes");
    } catch (error) {
      console.error("Error al crear estudiante:", error);
      toast.error(error.response?.data?.message || "Error al crear el estudiante");
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
