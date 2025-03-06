import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioGenerico from "../../../components/FormularioGenerico";
import axios from "axios";

const EditarEstudiante = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener estudiante:", error);
        setError("Error al cargar la información del estudiante");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const userData = {
        ...data,
        role: "Estudiante",
        isActive: data.isActive === "true" || data.isActive === true,
      };

      await axios.put(`/api/students/${id}`, userData);
      navigate("/administrador/estudiantes");
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      setError(error.response?.data?.message || "Error al actualizar el estudiante");
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
  if (error) return <div>{error}</div>;
  if (!student) return <div>Estudiante no encontrado</div>;

  return (
    <FormularioGenerico
      titulo="Editar Estudiante"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Actualizar Estudiante"
      returnUrl="/administrador/estudiantes"
      initialData={{
        firstName: student.firstName,
        lastName: student.lastName,
        cedula: student.cedula,
        email: student.email,
        isActive: student.isActive,
      }}
      error={error}
    />
  );
};

export default EditarEstudiante;
