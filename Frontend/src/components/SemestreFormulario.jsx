import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  periodo: yup
    .string()
    .required("El periodo es requerido")
    .matches(/^[1-2]$/, "El periodo debe ser 1 o 2"),
  año: yup
    .string()
    .required("El año es requerido")
    .matches(/^20[0-9]{2}$/, "El año debe estar entre 2000 y 2099")
});

const SemestreFormulario = ({
  initialData,
  onSubmit,
  isEditing = false,
  submitButtonText,
  returnUrl,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      periodo: "",
      año: "",
    },
  });

  const handleCancel = () => {
    navigate(returnUrl);
  };

  const formTitle = isEditing ? "Editar Semestre" : "Agregar Nuevo Semestre";
  const buttonText = submitButtonText || (isEditing ? "Actualizar" : "Agregar");

  return (
    <div className="w-full flex justify-center items-center mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-4 w-4/5 shadow-lg rounded-md border border-gray-200 flex flex-col justify-center"
      >
        <div className="flex justify-center items-center gap-2 mb-4">
          <Link to={returnUrl}>
            <IoArrowBackCircle className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-center">{formTitle}</h1>
        </div>

        <div>
          <label htmlFor="periodo" className="block text-sm font-medium">
            Periodo
          </label>
          <input
            {...register("periodo")}
            type="text"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
          />
          {errors.periodo && (
            <p className="text-red-500 text-sm">{errors.periodo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="año" className="block text-sm font-medium">
            Año
          </label>
          <input
            {...register("año")}
            type="text"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
          />
          {errors.año && (
            <p className="text-red-500 text-sm">{errors.año.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="md:w-1/4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer self-center"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SemestreFormulario;
