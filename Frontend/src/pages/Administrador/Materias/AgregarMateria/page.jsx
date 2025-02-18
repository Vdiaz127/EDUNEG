import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MateriasFormulario from "../../../../components/MateriasFormulario";
import axios from 'axios';

const FormularioMateria = () => {
  const { id } = useParams(); // Si existe, estamos en modo edición
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const isEditMode = Boolean(id); // Modo edición si id existe

  useEffect(() => {
    if (isEditMode) {
      axios.get(`/api/subjects/${id}`)
        .then(response => {
          setInitialData(response.data);
        })
        .catch(error => {
          console.error('Error al cargar los datos de la materia:', error);
        });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        // Para editar, se usa PUT y se envían los datos formateados
        await axios.put(`/api/subjects/${id}`, {
          code: data.codigo,
          name: data.nombre,
          description: data.descripcion,
          credits: data.unidadesCreditos,
        });
        console.log('Materia actualizada');
      } else {
        // Para crear, se usa POST
        await axios.post('/api/subjects', {
          code: data.codigo,
          name: data.nombre,
          description: data.descripcion,
          credits: data.unidadesCreditos,
        });
        console.log('Materia creada');
      }
      navigate('/administrador/materias');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <MateriasFormulario initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default FormularioMateria;
