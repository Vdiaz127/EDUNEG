import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioGenerico from "../../../components/FormularioGenerico";
import axios from "axios";

const AgregarEstudiante = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const userData = {
        ...data,
        role: "Estudiante",
        isActive: data.isActive === "true" || data.isActive === true,
      };

      await axios.post("/api/students", userData);
      navigate("/administrador/estudiantes");
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      setError(error.response?.data?.message || "Error al crear el estudiante");
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
      name: "cedula",
      label: "Cédula",
      type: "text",
      placeholder: "Ingrese la cédula",
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
      titulo="Agregar Estudiante"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Crear Estudiante"
      returnUrl="/administrador/estudiantes"
      error={error}
    />
  );
};

export default AgregarEstudiante;