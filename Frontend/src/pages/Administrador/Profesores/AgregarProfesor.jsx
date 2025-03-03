import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioGenerico from "../../../components/FormularioGenerico";
import axios from "axios";

const AgregarProfesor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // Asegurarnos de que el rol sea "Profesor"
      const userData = {
        ...data,
        role: "Profesor",
        isActive: data.isActive === "true" || data.isActive === true,
      };

      await axios.post("/api/professors", userData);
      navigate("/administrador/profesores");
    } catch (error) {
      console.error("Error al agregar profesor:", error);
      setError(error.response?.data?.message || "Error al crear el profesor");
    } finally {
      setLoading(false);
    }
  };

  const campos = [
    {
      name: "firstName",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre",
      required: true,
    },
    {
      name: "lastName",
      label: "Apellido",
      type: "text",
      placeholder: "Ingrese el apellido",
      required: true,
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "Ingrese el correo electrónico",
      required: true,
    },
    {
      name: "isActive",
      label: "Estatus",
      type: "select",
      options: [
        { value: true, label: "Activo" },
        { value: false, label: "Inactivo" },
      ],
      required: true,
    },
  ];

  if (loading) return <div>Cargando...</div>;

  return (
    <FormularioGenerico
      titulo="Agregar Profesor"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Crear Profesor"
      returnUrl="/administrador/profesores"
      error={error}
    />
  );
};

export default AgregarProfesor;