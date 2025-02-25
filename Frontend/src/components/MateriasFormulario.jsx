import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBackCircle } from "react-icons/io5";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0

const schema = yup.object().shape({
  codigo: yup.string().required("El código es requerido"),
  nombre: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(255, "Máximo 255 caracteres"),
  descripcion: yup
    .string()
    .required("La descripción es requerida")
    .min(3, "Mínimo 3 caracteres")
    .max(255, "Máximo 255 caracteres"),
  unidadesCreditos: yup
    .number()
    .required("Las unidades de crédito son requeridas")
    .max(4, "Máximo 4 unidades permitidas")
    .typeError("Debe ser un número válido"),
});

<<<<<<< HEAD
const MateriasFormulario = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
=======
const MateriasFormulario = ({ initialData }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
      codigo: "",
      nombre: "",
      descripcion: "",
      unidadesCreditos: "",
    },
  });

<<<<<<< HEAD
  return (
    <div className="w-full flex justify-end m-8">
=======
  // Cuando initialData cambie, reseteamos el formulario con esos valores
  useEffect(() => {
    if (initialData) {
      reset({
        codigo: initialData.code || "",
        nombre: initialData.name || "",
        descripcion: initialData.description || "",
        unidadesCreditos: initialData.credits || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      if (initialData) {
        // Actualiza materia existente
        await axios.put(`/api/subjects/${initialData.id}`, {
          code: data.codigo,
          name: data.nombre,
          description: data.descripcion,
          credits: data.unidadesCreditos,
        });
      } else {
        // Crea nueva materia
        await axios.post("/api/subjects", {
          code: data.codigo,
          name: data.nombre,
          description: data.descripcion,
          credits: data.unidadesCreditos,
        });
      }
      navigate("/administrador/materias");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center m-8">
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 mr-14 space-y-4 w-4/5 shadow-lg rounded-md border border-gray-300 flex flex-col justify-center"
      >
        <div className="flex justify-center items-center gap-2 mb-4">
          <Link to="/administrador/materias">
            <IoArrowBackCircle className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-center">
            {initialData ? "Actualizar Materia" : "Crear Materia"}
          </h1>
        </div>

        <div>
          <label htmlFor="codigo" className="block text-sm font-medium">
            Código
          </label>
          <input
            {...register("codigo")}
            type="text"
<<<<<<< HEAD
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500  p-2 outline-none"
=======
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
          />
          {errors.codigo && (
            <p className="text-red-500 text-sm">{errors.codigo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            {...register("nombre")}
            type="text"
<<<<<<< HEAD
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500  p-2 outline-none"
=======
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium">
            Descripción
          </label>
          <textarea
            {...register("descripcion")}
<<<<<<< HEAD
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500  p-2 outline-none"
=======
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
            rows="3"
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm">{errors.descripcion.message}</p>
          )}
        </div>

        <div>
<<<<<<< HEAD
          <label
            htmlFor="unidadesCreditos"
            className="block text-sm font-medium"
          >
=======
          <label htmlFor="unidadesCreditos" className="block text-sm font-medium">
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
            Unidades de Créditos
          </label>
          <input
            {...register("unidadesCreditos")}
            type="number"
            min="0"
            max="4"
            step="1"
<<<<<<< HEAD
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500  p-2 outline-none"
=======
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
>>>>>>> 70f7132946dd18df20bc62c78faedb4b81e630d0
          />
          {errors.unidadesCreditos && (
            <p className="text-red-500 text-sm">
              {errors.unidadesCreditos.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="md:w-1/4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer self-center"
        >
          {initialData ? "Actualizar Materia" : "Crear Materia"}
        </button>
      </form>
    </div>
  );
};

export default MateriasFormulario;
