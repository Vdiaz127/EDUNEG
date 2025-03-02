import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormularioGenerico from '../../../components/FormularioGenerico';

const EditarCarrera = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrera, setCarrera] = useState(null);

  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        const response = await axios.get(`/api/careers/${id}`);
        setCarrera(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la carrera');
        setLoading(false);
      }
    };

    fetchCarrera();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      await axios.put(`/api/careers/${id}`, data);
      navigate('/administrador/carreras');
    } catch (error) {
      console.error('Error al actualizar la carrera:', error);
      const errorMessage = error.response?.data?.message || 'Ocurrió un error al guardar los datos.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const campos = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ingrese el nombre de la carrera',
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'text',
      required: false,
      placeholder: 'Ingrese una descripción',
    },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!carrera) return <div>No se encontró la carrera</div>;

  return (
    <FormularioGenerico
      titulo="Editar Carrera"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Guardar Cambios"
      returnUrl="/administrador/carreras"
      initialData={carrera}
      error={error}
    />
  );
};

export default EditarCarrera;