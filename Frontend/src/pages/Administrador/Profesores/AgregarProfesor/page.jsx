import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserFormulario from "../../../../components/UserFormulario";
import axios from "axios";
import { toast } from "react-toastify";

const AgregarProfesor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      // Asegurarnos de que el estatus se maneje correctamente
      const userData = {
        ...data,
        rol: "Profesor",
        estatus: data.estatus === "true" || data.estatus === true
      };

      await axios.post('/api/professors', userData);
      toast.success("Profesor agregado exitosamente");
      navigate("/administrador/profesores");
    } catch (error) {
      console.error("Error al agregar profesor:", error);
      toast.error(error.response?.data?.message || "Error al agregar el profesor");
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
        nombre: "",
        apellido: "",
        email: "",
        estatus: "true"
      }}
      isEditing={false}
      submitButtonText="Crear Profesor"
      returnUrl="/administrador/profesores"
    />
  );
};

export default AgregarProfesor;
