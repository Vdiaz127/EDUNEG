import UserFormulario from "../../../../components/UserFormulario";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormularioEstudiante = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      // Convertir el string "true"/"false" a booleano real
      const userData = {
        ...data,
        estatus: data.estatus === "true"
      };

      const response = await axios.post("/api/students", userData);
      
      toast.success("Estudiante creado exitosamente");
      navigate("/administrador/estudiantes");
    } catch (error) {
      console.error("Error al crear estudiante:", error);
      toast.error(error.response?.data?.message || "Error al crear el estudiante");
    }
  };

  return (
    <UserFormulario 
      onSubmit={handleSubmit} 
      rol={"Estudiante"} 
      initialData={{
        nombre: "",
        apellido: "",
        email: "",
        estatus: "true" // Establecer el valor por defecto como "true" para Activo
      }}
    />
  );
};

export default FormularioEstudiante;
