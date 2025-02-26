import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CardAdmin from "../../components/CardAdmin";
import AccionesAdmin from "../../components/AccionesAdmin";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

function AdminPage() {
  const location = useLocation();
  const isSubRoute =
    location.pathname.includes("/administrador/") &&
    !location.pathname.endsWith("/administrador");

  const [studentCount, setStudentCount] = useState(0);
  const [professorCount, setProfessorCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const studentResponse = await fetch("/api/students");
        const students = await studentResponse.json();
        setStudentCount(students.length);

        const professorResponse = await fetch("/api/professors");
        const professors = await professorResponse.json();
        setProfessorCount(professors.length);

        const subjectResponse = await fetch("/api/subjects");
        const subjects = await subjectResponse.json();
        setSubjectCount(subjects.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  if (isSubRoute) {
    return <Outlet />;
  }

  return (
    <div className="w-full">
      {/* Banner superior */}
      <div className="w-full h-48 relative border-2 border-gray-300 rounded-md shadow-md mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/EDUNEG.webp')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <p className="font-bold text-4xl text-white">EDUNEG</p>
          <p className="font-semibold text-2xl text-balance text-center text-white">
            El conocimiento es tu mejor aliado
          </p>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="w-full flex justify-between gap-5 flex-wrap md:flex-nowrap mb-4">
        <CardAdmin
          ruta={"/administrador/estudiantes"}
          titulo={"Estudiantes"}
          imagen={"/images/ALUMNOS.webp"}
          cantidad={studentCount}
          isFullWidth={false}
        />

        <CardAdmin
          ruta={"/administrador/profesores"}
          titulo={"Profesores"}
          imagen={"/images/PROFESORES.webp"}
          cantidad={professorCount}
          isFullWidth={false}
        />
      </div>

      {/* Tarjeta de materias */}
      <CardAdmin
        ruta={"/administrador/materias"}
        titulo={"Materias"}
        imagen={"/images/MATERIAS.webp"}
        cantidad={subjectCount}
        isFullWidth={true}
      />

      {/* Acciones rápidas */}
      <div className="w-full flex justify-center items-center flex-wrap md:flex-nowrap my-4 gap-12">
        <AccionesAdmin
          ruta="/administrador/estudiantes/agregar"
          color="bg-blue-500"
          texto="Agregar Estudiante"
          icono={<FaGraduationCap color="white" className="w-12 h-12" />}
        />

        <AccionesAdmin
          ruta="/administrador/profesores/agregar"
          color="bg-green-500"
          texto="Agregar Profesor"
          icono={<FaChalkboardTeacher color="white" className="w-12 h-12" />}
        />

        <AccionesAdmin
          ruta="/administrador/materias/agregar"
          color="bg-red-500"
          texto="Agregar Materia"
          icono={<ImBooks color="white" className="w-12 h-12" />}
        />
      </div>

      {/* Contenido adicional */}
      <Outlet />
    </div>
  );
}

export default AdminPage;