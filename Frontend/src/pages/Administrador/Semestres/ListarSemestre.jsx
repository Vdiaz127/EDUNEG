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
      backgroundColor: "#F3F4F6",
      borderBottomWidth: "1px",
      borderColor: "#E5E7EB",
      fontWeight: "bold",
      fontSize: "18px",
      textAlign: "center",
      "@media (max-width: 640px)": {
        fontSize: "16px",
      },
    },
  },
  rows: {
    style: {
      backgroundColor: "white",
      "&:nth-of-type(odd)": {
        backgroundColor: "#F9FAFB",
      },
      "&:hover": {
        backgroundColor: "#F3F4F6",
      },
    },
  },
  cells: {
    style: {
      fontWeight: "500",
      fontSize: "16px",
      textAlign: "center",
      justifyContent: "center",
      paddingTop: "1rem",
      paddingBottom: "1rem",
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
  if (!query) return data;
  return data.filter((record) => {
    return (
      record.periodo.toString().toLowerCase().includes(query.toLowerCase()) ||
      record.año.toString().toLowerCase().includes(query.toLowerCase())
    );
  });
};

const ListarSemestre = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [semesterToDelete, setSemesterToDelete] = useState(null);

  const fetchSemesters = async () => {
    try {
      const response = await axios.get('/api/semesters');
      setSemesters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener semestres:', error);
      setError('Error al cargar los semestres');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const openDeleteModal = (semester) => {
    setSemesterToDelete(semester);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSemesterToDelete(null);
  };

  const handleDelete = async () => {
    if (semesterToDelete) {
      try {
        await axios.delete(`/api/semesters/${semesterToDelete._id}`);
        await fetchSemesters();
        closeModal();
      } catch (error) {
        console.error('Error al eliminar semestre:', error);
        setError('Error al eliminar el semestre');
      }
    }
  };

  const columns = [
    {
      name: "Periodo",
      selector: row => row.periodo,
      sortable: true,
      center: true,
      width: "30%"
    },
    {
      name: "Año",
      selector: row => row.año,
      sortable: true,
      center: true,
      width: "30%"
    },
    {
      name: "Acciones",
      cell: row => (
        <div className="flex justify-center gap-4">
          <Link
            to={`/administrador/semestres/ver/${row._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye size={20} />
          </Link>
          <Link
            to={`/administrador/semestres/editar/${row._id}`}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit size={20} />
          </Link>
          <button
            onClick={() => openDeleteModal(row)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ),
      center: true,
      width: "40%"
    },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabla
        columns={columns}
        data={semesters}
        customStyles={customStyles}
        filterFunction={filterFunction}
        placeholder="Buscar por periodo o año..."
        rol="Semestres"
        buttontext="Agregar Semestre"
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Confirmar eliminación"
      >
        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-6">
          ¿Está seguro que desea eliminar el semestre {semesterToDelete?.periodo}-{semesterToDelete?.año}?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ListarSemestre;
