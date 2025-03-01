import { useEffect, useState } from 'react';
import { IoIosSkipBackward } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { LuGraduationCap } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SeccionInformacion = ({
  subjectId,
  semesterId,
  sectionNumber,
  profesorId,
  arrayStudents, // Array de IDs de estudiantes
  id,
}) => {
  const navigate = useNavigate();

  // Estados para la información poblada
  const [subject, setSubject] = useState(null);
  const [semester, setSemester] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [students, setStudents] = useState([]);

  // Obtener la información de la materia
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await axios.get(`/api/subjects/${subjectId}`);
        setSubject(res.data);
      } catch (error) {
        console.error("Error al obtener la materia:", error);
      }
    };
    if (subjectId) fetchSubject();
  }, [subjectId]);

  // Obtener la información del semestre
  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const res = await axios.get(`/api/semesters/${semesterId}`);
        setSemester(res.data);
      } catch (error) {
        console.error("Error al obtener el semestre:", error);
      }
    };
    if (semesterId) fetchSemester();
  }, [semesterId]);

  // Obtener la información del profesor
  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const res = await axios.get(`/api/professors/${profesorId}`);
        setProfessor(res.data);
      } catch (error) {
        console.error("Error al obtener el profesor:", error);
      }
    };
    if (profesorId) fetchProfessor();
  }, [profesorId]);

  // Obtener la información de los estudiantes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentPromises = arrayStudents.map((studentId) =>
          axios.get(`/api/students/${studentId}`)
        );
        const studentsRes = await Promise.all(studentPromises);
        setStudents(studentsRes.map(res => res.data));
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    };
    if (arrayStudents && arrayStudents.length > 0) fetchStudents();
  }, [arrayStudents]);

  const handleEdit = () => {
    navigate(`/administrador/secciones/editar/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen m-5">
      {/* Contenedor de la información */}
      <div className="md:w-1/2 border-2 border-gray-200 rounded-lg shadow-lg py-8 px-5">
        <h1 className="mb-8 text-2xl font-bold text-center">
          Información de la Sección
        </h1>

        {/* Fila: Materia y Semestre */}
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap mb-4 gap-5">
          {/* Materia */}
          <div className="w-full md:w-1/2 bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <FaCode color="blue" className="w-7 h-7" />
              Materia
            </p>
            <p className="font-bold text-lg">
              {subject ? subject.name : subjectId}
            </p>
          </div>

          {/* Semestre */}
          <div className="w-full md:w-1/2 bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <FiBook color="green" className="w-7 h-7" />
              Semestre
            </p>
            <p className="font-bold text-lg">
              {semester ? `Semestre ${semester.periodo} - ${semester.año}` : semesterId}
            </p>
          </div>
        </div>

        {/* Fila: Número de Sección */}
        <div className="flex justify-between items-center mb-4 gap-5">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <GrDocumentText color="orange" className="w-6 h-6" />
              Número de Sección
            </p>
            <p className="font-bold text-lg">{sectionNumber}</p>
          </div>
        </div>

        {/* Fila: Profesor */}
        <div className="flex justify-between items-center mb-4 gap-5">
          <div className="w-full bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold flex items-center gap-2">
              <LuGraduationCap color="purple" className="w-7 h-7" />
              Profesor
            </p>
            <p className="font-bold text-lg">
              {professor ? `${professor.firstName} ${professor.lastName} – ${professor.email}` : profesorId}
            </p>
          </div>
        </div>

        {/* Fila: Estudiantes (mostrar nombre y correo) */}
        <div className="w-full bg-gray-100 border-2 border-gray-300 py-2 px-5 rounded-lg shadow-md">
        {students && students.length > 0 && (
          <div className="flex flex-col mb-4 gap-5">
            <p className="text-lg font-semibold flex items-center gap-2">
              <span className="w-7 h-7">👥</span>
              Estudiantes
            </p>
            <ul className="font-bold text-lg">
              {students.map((student) => (
                <li key={student._id}>
                  {student.firstName} {student.lastName} – {student.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

      {/* Botones para regresar y editar */}
      <div className="mt-4 w-1/2 flex justify-center md:justify-between items-center flex-wrap gap-4">
        <Link to="/administrador/secciones">
          <button className="bg-black text-white flex justify-center items-center gap-2 px-8 py-2 text-center rounded-md shadow-md cursor-pointer text-sm md:text-md">
            <IoIosSkipBackward className="w-5 h-5" />
            Regresar
          </button>
        </Link>
        <button
          onClick={handleEdit}
          className="bg-gray-100 px-8 py-2 text-center border-2 border-gray-300 rounded-md shadow-md cursor-pointer text-sm md:text-md"
        >
          Editar Sección
        </button>
      </div>
    </div>
  );
};

export default SeccionInformacion;
