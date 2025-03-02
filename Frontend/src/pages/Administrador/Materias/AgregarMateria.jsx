import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormularioGenerico from "../../../components/FormularioGenerico";
import axios from 'axios';

const AgregarMateria = () => {
  const { id } = useParams(); // Si existe, estamos en modo edición
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const isEditMode = Boolean(id); // Modo edición si id existe
  const [error, setError] = useState(null);

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
      setError(error.response?.data?.message || 'Ocurrió un error al guardar los datos.');
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

  return (
    <div>
      <FormularioGenerico
        titulo={isEditMode ? "Editar Materia" : "Agregar Materia"}
        campos={campos}
        onSubmit={handleSubmit}
        submitButtonText={isEditMode ? "Actualizar Materia" : "Crear Materia"}
        returnUrl="/administrador/materias"
        initialData={initialData}
        error={error}
      />
    </div>
  );
};

export default AgregarMateria;
