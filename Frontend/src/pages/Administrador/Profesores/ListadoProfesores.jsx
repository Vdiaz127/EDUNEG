import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Tabla from "../../../components/Tabla";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
      record.nombre.toLowerCase().includes(query.toLowerCase()) ||
      record.email.toLowerCase().includes(query.toLowerCase())
    );
  });
};

const DashboardProfesores = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [professorToDelete, setProfessorToDelete] = useState(null);

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('/api/professors');
      setProfessors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener profesores:', error);
      setError('Error al cargar los profesores');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const openDeleteModal = (professor) => {
    setProfessorToDelete(professor);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setProfessorToDelete(null);
  };

  const handleDelete = async () => {
    if (professorToDelete) {
      try {
        await axios.delete(`/api/professors/${professorToDelete.id}`);
        toast.success('Profesor eliminado exitosamente');
        fetchProfessors();
        closeModal();
      } catch (error) {
        console.error('Error al eliminar profesor:', error);
        toast.error(error.response?.data?.message || 'Error al eliminar el profesor');
        closeModal();
      }
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      center: "true",
    },
    {
      name: "Email",
      selector: (row) => row.email,
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
            backgroundColor: row.isActive === "Activo" ? "#7FF8AA" : "#FECACA",
            color: row.isActive === "Activo" ? "#166534" : "#991B1B",
            width: "5rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {row.isActive}
        </div>
      ),
    },
    {
      name: "Acciones",
      center: "true",
      cell: (row) => (
        <div className="flex space-x-2 md:space-x-8">
          <Link to={`/administrador/profesores/ver/${row.id}`}>
            <FaEye className="cursor-pointer w-4 h-4 md:w-5 md:h-5" title="Ver" />
          </Link>
          <Link to={`/administrador/profesores/editar/${row.id}`}>
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
        data={professors}
        customStyles={customStyles}
        buttontext="Agregar Profesor"
        placeholder="Buscar por nombre o email"
        filterFunction={filterFunction}
        rol="Profesores"
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
            ¿Estás seguro de que deseas eliminar este profesor?
            {professorToDelete && (
              <span className="block font-semibold mt-2">
                {professorToDelete.nombre}
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

export default DashboardProfesores;
