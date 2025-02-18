import { Outlet, useLocation } from "react-router-dom";
import CardAdmin from "../../components/CardAdmin";
import AccionesAdmin from "../../components/AccionesAdmin";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import Sidebar from "../../components/Sidebar/Sidebar";


function AdminPage() {
  const location = useLocation();
  const isSubRoute =
    location.pathname.includes("/administrador/") &&
    !location.pathname.endsWith("/administrador");

  if (isSubRoute) {
    return <Outlet />;
  }

  return (
    <div>
    

    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-4/5 h-36 relative border-2 border-gray-300 rounded-md shadow-md mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/EDUNEG.webp')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 bg-black opacity-50 "></div>{" "}
        <div className="absolute inset-0 flex flex-col justify-center items-center ml-6">
          <p className="font-bold text-4xl text-white">EDUNEG</p>
          <p className="font-semibold text-2xl text-balance text-center text-white">
            El conocimiento es tu mejor aliado
          </p>
        </div>
      </div>

      <div className="w-full md:w-4/5 flex justify-between gap-5 flex-wrap md:flex-nowrap mb-4">
        <CardAdmin
          ruta={"/administrador/estudiantes"}
          titulo={"Estudiantes"}
          imagen={"/images/ALUMNOS.webp"}
          cantidad={10}
          isFullWidth={false}
        />

        <CardAdmin
          ruta={"/administrador/profesores"}
          titulo={"Profesores"}
          imagen={"/images/PROFESORES.webp"}
          cantidad={10}
          isFullWidth={false}
        />
      </div>

      <CardAdmin
        ruta={"/administrador/materias"}
        titulo={"Materias"}
        imagen={"/images/MATERIAS.webp"}
        cantidad={150}
        isFullWidth={true}
      />
      <div className="w-full md:w-4/5 flex justify-center items-center flex-wrap md:flex-nowrap my-4 gap-12">
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

      <Outlet />
    </div>
    </div>
  );
}

export default AdminPage;
