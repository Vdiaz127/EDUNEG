import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Tabla from "../../../components/Tabla";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardSecciones = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las secciones y, para cada una, obtener la información completa
  const fetchData = async () => {
    try {
      // Primero obtenemos las secciones (que contienen solo IDs)
      const sectionsRes = await axios.get("/api/sections");
      const sectionsData = sectionsRes.data;

      // Para cada sección, hacemos las peticiones para obtener los datos de materia, profesor y semestre
      const augmentedSections = await Promise.all(
        sectionsData.map(async (section) => {
          try {
            const [subjectRes, professorRes, semesterRes] = await Promise.all([
              axios.get(`/api/subjects/${section.subjectId}`),
              axios.get(`/api/professors/${section.profesorId}`),
              axios.get(`/api/semesters/${section.semesterId}`),
            ]);

            return {
              ...section,
              subject: subjectRes.data,       // Información completa de la materia
              professor: professorRes.data,     // Información completa del profesor
              semester: semesterRes.data,       // Información completa del semestre
            };
          } catch (error) {
            console.error(
              "Error fetching data for section:",
              section._id,
              error
            );
            return section; // Retornamos la sección sin aumentar en caso de error
          }
        })
      );

      setSections(augmentedSections);
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para eliminar una sección y actualizar el listado
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sections/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };

  // Definición de las columnas utilizando la información obtenida
  const columns = [
    {
      name: "Materia",
      selector: (row) => (row.subject ? row.subject.name : row.subjectId),
      sortable: true,
      center: true,
    },
    {
      name: "Semestre",
      selector: (row) =>
        row.semester
          ? `Semestre ${row.semester.periodo} - ${row.semester.año}`
          : row.semesterId,
      sortable: true,
      center: true,
    },
    {
      name: "Número de Sección",
      selector: (row) => row.sectionNumber,
      center: true,
    },
    {
      name: "Profesor",
      selector: (row) =>
        row.professor
          ? `${row.professor.firstName} ${row.professor.lastName}`
          : row.profesorId,
      center: true,
    },
    {
      name: "Acciones",
      center: true,
      cell: (row) => (
        <div className="flex space-x-2 md:space-x-8">
          <Link to={`/administrador/secciones/ver/${row._id}`}>
            <FaEye className="cursor-pointer w-5 h-5" title="Ver" />
          </Link>
          <Link to={`/administrador/secciones/editar/${row._id}`}>
            <FaEdit className="cursor-pointer w-5 h-5" title="Editar" />
          </Link>
          <FaTrash
            className="cursor-pointer w-5 h-5"
            title="Eliminar"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  // Estilos personalizados para la tabla
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

  // Función para filtrar la búsqueda usando el nombre de la materia o el número de sección
  const filterFunction = (data, query) => {
    return data.filter((record) => {
      const subjectName = record.subject
        ? record.subject.name.toLowerCase()
        : "";
      const sectionNumber = record.sectionNumber.toLowerCase();
      return (
        subjectName.includes(query.toLowerCase()) ||
        sectionNumber.includes(query.toLowerCase())
      );
    });
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center">
      <Tabla
        columns={columns}
        data={sections}
        customStyles={customStyles}
        buttontext={"Agregar Sección"}
        placeholder={"Buscar por materia o sección"}
        filterFunction={filterFunction}
        rol={"Secciones"}
      />
    </div>
  );
};

export default DashboardSecciones;
