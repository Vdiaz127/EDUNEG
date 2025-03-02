import { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormularioGenerico = ({ titulo, campos, onSubmit, submitButtonText, returnUrl, initialData, error }) => {
  const [formData, setFormData] = useState(initialData || {});

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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    onSubmit(formData); // Llamar a la función onSubmit con los datos del formulario
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">{titulo}</h1>
      {error && ( // Mostrar error si existe
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campos.map((campo) => (
            <div key={campo.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {campo.label}
              </label>
              {campo.type === 'select' ? (
                <select
                  name={campo.name}
                  value={formData[campo.name] || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={campo.required}
                >
                  <option value="">Seleccione una opción</option>
                  {campo.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : campo.type === 'datepicker' ? (
                <DatePicker
                  selected={formData[campo.name] ? new Date(formData[campo.name]) : null}
                  onChange={(date) => handleDateChange(date, campo.name)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  minDate={campo.minDate} // Fecha mínima
                  maxDate={campo.maxDate} // Fecha máxima
                  required={campo.required}
                />
              ) : (
                <input
                  type={campo.type}
                  name={campo.name}
                  value={formData[campo.name] || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={campo.placeholder}
                  required={campo.required}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Link
            to={returnUrl}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioGenerico;