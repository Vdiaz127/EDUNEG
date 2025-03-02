import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormularioGenerico from '../../../components/FormularioGenerico';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditarSemestre = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [semestre, setSemestre] = useState(null);
  const currentYear = new Date().getFullYear();

  // Generar opciones para el año (año actual y los siguientes 4 años)
  const yearOptions = [];
  for (let year = currentYear; year <= currentYear + 4; year++) {
    yearOptions.push({ value: year, label: year });
  }

  const [selectedYear, setSelectedYear] = useState(currentYear); // Año seleccionado
  const [formData, setFormData] = useState({}); // Estado para manejar los datos del formulario

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year); // Actualizar el año seleccionado
    setFormData((prevData) => ({
      ...prevData,
      año: year, // Actualizar el año en el estado del formulario
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await axios.get(`/api/semesters/${id}`);
        setSemestre(response.data);
        setSelectedYear(response.data.año); // Establecer el año seleccionado al año del semestre
        setFormData({
          ...response.data,
          año: response.data.año.toString(), // Convertir el año a string para el input
        });
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el semestre:', error);
        setError('Error al cargar el semestre');
        setLoading(false);
      }
    };

    fetchSemester();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null); // Limpiar errores antes de enviar

      // Validar que la fecha de fin no sea menor que la fecha de inicio
      if (new Date(formData.fechaFin) < new Date(formData.fechaInicio)) {
        throw new Error('La fecha de fin no puede ser menor que la fecha de inicio.');
      }

      await axios.put(`/api/semesters/${id}`, formData);
      navigate('/administrador/semestres');
    } catch (error) {
      console.error('Error al actualizar el semestre:', error);
      // Extraer el mensaje de error del backend
      const errorMessage = error.response?.data?.message || 'Ocurrió un error al guardar los datos.';
      setError(errorMessage); // Mostrar el mensaje de error
    } finally {
      setLoading(false);
    }
  };

  const campos = [
    {
      name: 'periodo',
      label: 'Periodo',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
      required: true,
      onChange: handleChange, // Manejar el cambio de periodo
    },
    {
      name: 'año',
      label: 'Año',
      type: 'select',
      options: yearOptions,
      required: true,
      onChange: handleYearChange, // Manejar el cambio de año
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'datepicker',
      required: true,
      selected: formData.fechaInicio, // Fecha seleccionada
      onChange: (date) => handleDateChange(date, 'fechaInicio'), // Manejar el cambio de fecha
      minDate: new Date(selectedYear, 0, 1), // Fecha mínima: 1 de enero del año seleccionado
      maxDate: new Date(selectedYear, 11, 31), // Fecha máxima: 31 de diciembre del año seleccionado
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin',
      type: 'datepicker',
      required: true,
      selected: formData.fechaFin, // Fecha seleccionada
      onChange: (date) => handleDateChange(date, 'fechaFin'), // Manejar el cambio de fecha
      minDate: new Date(selectedYear, 0, 1), // Fecha mínima: 1 de enero del año seleccionado
      maxDate: new Date(selectedYear, 11, 31), // Fecha máxima: 31 de diciembre del año seleccionado
    },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!semestre) return <div>No se encontró el semestre</div>;

  return (
    <FormularioGenerico
      titulo="Editar Semestre"
      campos={campos}
      onSubmit={handleSubmit}
      submitButtonText="Guardar Cambios"
      returnUrl="/administrador/semestres"
      initialData={formData} // Pasar los datos iniciales al formulario
      error={error} // Pasar el error al formulario
    />
  );
};

export default EditarSemestre;