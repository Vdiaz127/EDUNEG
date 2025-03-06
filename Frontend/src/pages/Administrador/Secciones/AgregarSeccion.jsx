import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeccionesFormulario from "../../../components/SeccionFormulario";
import axios from 'axios';

const FormularioSeccion = () => {
  const { id } = useParams(); // Si existe, estamos en modo edición
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const isEditMode = Boolean(id); // Modo edición si id existe

  useEffect(() => {
    if (isEditMode) {
      axios.get(`/api/sections/${id}`)
        .then(response => {
          setInitialData(response.data);
        })
        .catch(error => {
          console.error('Error al cargar los datos de la sección:', error);
        });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        // Para editar, se usa PUT y se envían los datos formateados
        await axios.put(`/api/sections/${id}`, {
          subjectId: data.subjectId,
          semesterId: data.semesterId,
          sectionNumber: data.sectionNumber,
          profesorId: data.profesorId,
          arrayStudents: data.arrayStudents, // Si es necesario actualizar la lista de estudiantes
        });
        console.log('Sección actualizada');
      } else {
        // Para crear, se usa POST
        await axios.post('/api/sections', {
          subjectId: data.subjectId,
          semesterId: data.semesterId,
          sectionNumber: data.sectionNumber,
          profesorId: data.profesorId,
          arrayStudents: data.arrayStudents,
        });
        console.log('Sección creada');
      }
      navigate('/administrador/secciones');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <SeccionesFormulario initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default FormularioSeccion;
