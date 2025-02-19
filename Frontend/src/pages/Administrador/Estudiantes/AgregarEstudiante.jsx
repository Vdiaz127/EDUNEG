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
        rol: "Estudiante",
        estatus: data.estatus === "true" || data.estatus === true
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
      rol="Estudiante" 
      initialData={{
        nombre: "",
        apellido: "",
        email: "",
        estatus: "true"
      }}
      isEditing={false}
      submitButtonText="Crear Estudiante"
      returnUrl="/administrador/estudiantes"
    />
  );
};

export default FormularioEstudiante;
