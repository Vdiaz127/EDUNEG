import SemestreFormulario from '../../../components/SemestreFormulario';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AgregarSemestre = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post('/api/semesters', data);
      navigate('/administrador/semestres');
    } catch (error) {
      console.error('Error al crear semestre:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <SemestreFormulario
      onSubmit={handleSubmit}
      initialData={{
        periodo: '',
        año: ''
      }}
      isEditing={false}
      submitButtonText="Crear Semestre"
      returnUrl="/administrador/semestres"
    />
  );
};

export default AgregarSemestre;
