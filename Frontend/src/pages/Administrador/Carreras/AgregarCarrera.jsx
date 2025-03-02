import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormularioGenerico from '../../../components/FormularioGenerico';

const AgregarCarrera = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post('/api/careers', data);
      navigate('/administrador/carreras');
    } catch (error) {
      console.error('Error al crear carrera:', error);
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

  return (
    <FormularioGenerico
      titulo="Agregar Carrera"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Crear Carrera"
      returnUrl="/administrador/carreras"
      error={error}
    />
  );
};

export default AgregarCarrera;