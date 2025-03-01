import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  subjectId: yup.string().required("La materia es requerida"),
  semesterId: yup.string().required("El semestre es requerido"),
  sectionNumber: yup.string().required("El número de sección es requerido"),
  profesorId: yup.string().required("El profesor es requerido"),
  arrayStudents: yup.array().of(yup.string()),
});

const SeccionFormulario = ({ initialData }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subjectId: "",
      semesterId: "",
      sectionNumber: "",
      profesorId: "",
      arrayStudents: [],
    },
  });

  // Opciones para selects y checkboxes
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [errorOptions, setErrorOptions] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [subjectsRes, professorsRes, studentsRes, semestersRes] =
          await Promise.all([
            axios.get("/api/subjects"),
            axios.get("/api/professors"),
            axios.get("/api/students"),
            axios.get("/api/semesters"),
          ]);
        setSubjects(subjectsRes.data);
        setProfessors(professorsRes.data);
        setStudents(studentsRes.data);
        setSemesters(semestersRes.data);
        setLoadingOptions(false);
      } catch (error) {
        console.error("Error fetching options:", error);
        setErrorOptions("Error al cargar opciones");
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  // Precargar datos en modo edición
  useEffect(() => {
    if (initialData) {
      reset({
        subjectId: initialData.subjectId || "",
        semesterId: initialData.semesterId || "",
        sectionNumber: initialData.sectionNumber || "",
        profesorId: initialData.profesorId || "",
        arrayStudents: initialData.arrayStudents || [],
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      if (initialData) {
        await axios.put(`/api/sections/${initialData.id}`, data);
        console.log("Sección actualizada");
      } else {
        await axios.post("/api/sections", data);
        console.log("Sección creada");
      }
      navigate("/administrador/secciones");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  if (loadingOptions) return <div>Cargando opciones...</div>;
  if (errorOptions) return <div>{errorOptions}</div>;

  return (
    <div className="w-full flex justify-center items-center m-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 mr-14 space-y-4 w-4/5 shadow-lg rounded-md border border-gray-300 flex flex-col justify-center"
      >
        <div className="flex justify-center items-center gap-2 mb-4">
          <Link to="/administrador/secciones">
            <IoArrowBackCircle className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-center">
            {initialData ? "Actualizar Sección" : "Crear Sección"}
          </h1>
        </div>

        {/* Materia */}
        <div>
          <label htmlFor="subjectId" className="block text-sm font-medium">
            Materia:
          </label>
          <select
            {...register("subjectId")}
            id="subjectId"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
            required
          >
            <option value="">Seleccione una materia</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId && (
            <p className="text-red-500 text-sm">{errors.subjectId.message}</p>
          )}
        </div>

        {/* Semestre */}
        <div>
          <label htmlFor="semesterId" className="block text-sm font-medium">
            Semestre:
          </label>
          <select
            {...register("semesterId")}
            id="semesterId"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
            required
          >
            <option value="">Seleccione un semestre</option>
            {semesters.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {`Semestre ${semester.periodo} - ${semester.año}`}
              </option>
            ))}
          </select>
          {errors.semesterId && (
            <p className="text-red-500 text-sm">{errors.semesterId.message}</p>
          )}
        </div>

        {/* Número de Sección */}
        <div>
          <label htmlFor="sectionNumber" className="block text-sm font-medium">
            Número de Sección:
          </label>
          <input
            {...register("sectionNumber")}
            id="sectionNumber"
            type="text"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
            required
          />
          {errors.sectionNumber && (
            <p className="text-red-500 text-sm">{errors.sectionNumber.message}</p>
          )}
        </div>

        {/* Profesor */}
        <div>
          <label htmlFor="profesorId" className="block text-sm font-medium">
            Profesor:
          </label>
          <select
            {...register("profesorId")}
            id="profesorId"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
            required
          >
            <option value="">Seleccione un profesor</option>
            {professors.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {`${professor.firstName} ${professor.lastName}`}
              </option>
            ))}
          </select>
          {errors.profesorId && (
            <p className="text-red-500 text-sm">{errors.profesorId.message}</p>
          )}
        </div>

        {/* Estudiantes */}
        <fieldset>
          <legend className="block text-sm font-medium">Estudiantes:</legend>
          <div className="mt-1">
            {students.map((student) => (
              <div key={student.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={student.id}
                  {...register("arrayStudents")}
                  className="mr-2"
                />
                <span>{`${student.firstName} ${student.lastName}`}</span>
              </div>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="md:w-1/4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer self-center"
        >
          {initialData ? "Actualizar Sección" : "Crear Sección"}
        </button>
      </form>
    </div>
  );
};

export default SeccionFormulario;
