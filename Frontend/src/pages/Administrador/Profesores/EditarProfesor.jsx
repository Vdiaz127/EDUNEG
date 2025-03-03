import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioGenerico from "../../../components/FormularioGenerico";
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
      setLoading(true);
      setError(null);

      // Asegurarnos de que el rol sea "Profesor"
      const userData = {
        ...data,
        role: "Profesor",
        isActive: data.isActive === "true" || data.isActive === true,
      };

      await axios.put(`/api/professors/${id}`, userData);
      navigate("/administrador/profesores");
    } catch (error) {
      console.error("Error al actualizar profesor:", error);
      setError(error.response?.data?.message || "Error al actualizar el profesor");
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
  if (error) return <div>{error}</div>;
  if (!professor) return <div>Profesor no encontrado</div>;

  return (
    <FormularioGenerico
      titulo="Editar Profesor"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Actualizar Profesor"
      returnUrl="/administrador/profesores"
      initialData={{
        firstName: professor.firstName,
        lastName: professor.lastName,
        email: professor.email,
        isActive: professor.isActive,
      }}
      error={error}
    />
  );
};

export default EditarProfesor;