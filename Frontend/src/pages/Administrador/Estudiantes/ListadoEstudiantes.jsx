import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Tabla from "../../../components/Tabla";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';

// Establecer el elemento raíz de la aplicación para el modal
Modal.setAppElement('#root');

/* Estilos para la tabla */
const customStyles = {
  headRow: {
    style: {
      fontWeight: "bold",
      fontSize: "18px",
      textAlign: "center",
      "@media (max-width: 640px)": {
        fontSize: "16px",
      },
    },
  },
  cells: {
    style: {
      fontWeight: "500",
      fontSize: "16px",
      textAlign: "center",
      justifyContent: "center",
      "@media (max-width: 640px)": {
        fontSize: "14px",
      },
    },
  },
};

/* Estilos para el modal */
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

/* Función para filtrar las búsquedas */
const filterFunction = (data, query) => {
  return data.filter((record) => {
    return (
      record.firstName.toLowerCase().includes(query.toLowerCase()) ||
      record.cedula.toLowerCase().includes(query.toLowerCase())
    );
  });
};

const DashboardEstudiantes = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
      setError('Error al cargar los estudiantes');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setStudentToDelete(null);
  };

  const handleDelete = async () => {
    if (studentToDelete) {
      try {
        await axios.delete(`/api/students/${studentToDelete.id}`);
        
        fetchStudents();
        closeModal();
      } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        
        closeModal();
      }
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      center: "true",
    },
    {
      name: "Cédula",
      selector: (row) => row.cedula,
      sortable: true,
      center: "true",
    },
    {
      name: "Estatus",
      center: "true",
      selector: (row) => row.isActive,
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.isActive ? "#7FF8AA" : "#FECACA",
            color: row.isActive ? "#166534" : "#991B1B",
            width: "5rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {row.isActive ? "Activo" : "Inactivo"}
        </div>
      ),
    },
    {
      name: "Acciones",
      center: "true",
      cell: (row) => (
        <div className="flex space-x-2 md:space-x-8">
          <Link to={`/administrador/estudiantes/ver/${row.id}`}>
            <FaEye className="cursor-pointer w-4 h-4 md:w-5 md:h-5" title="Ver" />
          </Link>
          <Link to={`/administrador/estudiantes/editar/${row.id}`}>
            <FaEdit className="cursor-pointer w-4 h-4 md:w-5 md:h-5" title="Editar" />
          </Link>
          <FaTrash 
            className="cursor-pointer w-4 h-4 md:w-5 md:h-5 text-red-600 hover:text-red-800" 
            title="Eliminar" 
            onClick={() => openDeleteModal(row)}
          />
        </div>
      ),
    },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-end">
      <Tabla
        columns={columns}
        data={students}
        customStyles={customStyles}
        buttontext="Agregar Estudiante"
        placeholder="Buscar por nombre o cédula"
        filterFunction={filterFunction}
        rol="Estudiantes"
        responsive 
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Confirmar eliminación"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
          <p className="text-gray-600 mb-6 text-center">
            ¿Estás seguro de que deseas eliminar este estudiante?
            {studentToDelete && (
              <span className="block font-semibold mt-2">
                {studentToDelete.firstName} {studentToDelete.lastName}
              </span>
            )}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardEstudiantes;
