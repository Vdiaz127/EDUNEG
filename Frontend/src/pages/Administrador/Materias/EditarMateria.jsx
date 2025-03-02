import { useParams, useNavigate } from "react-router-dom";
import FormularioGenerico from "../../../components/FormularioGenerico";
import axios from "axios";
import { useEffect, useState } from "react";

const EditarMateria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await axios.get(`/api/subjects/${id}`);
        setMateria(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener materia:", error);
        setError("Error al cargar la información de la materia");
        setLoading(false);
      }
    };

    fetchMateria();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      const materiaData = {
        code: data.codigo,
        name: data.nombre,
        description: data.descripcion,
        credits: parseInt(data.unidadesCreditos, 10),
      };

      await axios.put(`/api/subjects/${id}`, materiaData);
      navigate("/administrador/materias");
    } catch (error) {
      console.error("Error al actualizar materia:", error);
      setError(error.response?.data?.message || "Error al actualizar la materia");
    }
  };

  const campos = [
    {
      name: 'codigo',
      label: 'Código',
      type: 'text',
      placeholder: 'Ingrese el código de la materia',
      required: true,
    },
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ingrese el nombre de la materia',
      required: true,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Ingrese la descripción de la materia',
      required: true,
    },
    {
      name: 'unidadesCreditos',
      label: 'Unidades de Crédito',
      type: 'number',
      placeholder: 'Ingrese las unidades de crédito',
      required: true,
    },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!materia) return <div>Materia no encontrada</div>;

  return (
    <FormularioGenerico
      titulo="Editar Materia"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Actualizar Materia"
      returnUrl="/administrador/materias"
      initialData={{
        codigo: materia.code,
        nombre: materia.name,
        descripcion: materia.description,
        unidadesCreditos: materia.credits,
      }}
      error={error}
    />
  );
};

export default EditarMateria;