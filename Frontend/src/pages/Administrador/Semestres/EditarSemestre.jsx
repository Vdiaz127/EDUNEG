import SemestreFormulario from '../../../components/SemestreFormulario';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditarSemestre = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [semestre, setSemestre] = useState(null);

  useEffect(() => {
    const fetchSemestre = async () => {
      try {
        const response = await axios.get(`/api/semesters/${id}`);
        setSemestre(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el semestre:', error);
        setError('Error al cargar el semestre');
        setLoading(false);
      }
    };

    fetchSemestre();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(`/api/semesters/${id}`, data);
      navigate('/administrador/semestres');
    } catch (error) {
      console.error('Error al actualizar el semestre:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!semestre) return <div>No se encontró el semestre</div>;

  return (
    <SemestreFormulario
      onSubmit={handleSubmit}
      initialData={{
        periodo: semestre.periodo,
        año: semestre.año
      }}
      isEditing={true}
      submitButtonText="Guardar Cambios"
      returnUrl="/administrador/semestres"
    />
  );
};

export default EditarSemestre;
