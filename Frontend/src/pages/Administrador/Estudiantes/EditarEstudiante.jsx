import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserFormulario from "../../../components/UserFormulario";
import axios from "axios";
import { toast } from "react-toastify";

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
      const userData = {
        ...data,
        isActive: data.isActive === "true" || data.isActive === true
      };

      await axios.put(`/api/students/${id}`, userData);
      
      toast.success("Estudiante actualizado exitosamente");
      navigate("/administrador/estudiantes");
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      toast.error(error.response?.data?.message || "Error al actualizar el estudiante");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!student) return <div>Estudiante no encontrado</div>;

  return (
    <UserFormulario 
      onSubmit={handleSubmit}
      rol="Estudiante"
      initialData={{
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: student.role,
        isActive: student.isActive.toString()
      }}
      isEditing={true}
      submitButtonText="Actualizar Estudiante"
      returnUrl="/administrador/estudiantes"
    />
  );
};

export default EditarEstudiante;
