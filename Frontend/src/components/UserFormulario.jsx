import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  email: yup
    .string()
    .required("El email es requerido")
    .email("Formato de email inválido"),
  isActive: yup
    .string()
    .required("El estatus es requerido")
    .typeError("Debes seleccionar un estatus válido"),
});

const UserFormulario = ({ 
  initialData, 
  onSubmit, 
  rol, 
  isEditing = false, 
  submitButtonText,
  returnUrl 
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      email: "",
      isActive: "",
    },
  });

  const handleCancel = () => {
    navigate(returnUrl);
  };

  const formTitle = isEditing ? `Actualizar ${rol}` : `Agregar un Nuevo ${rol}`;
  const buttonText = submitButtonText || (isEditing ? `Actualizar ${rol}` : `Agregar ${rol}`);

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
          <h1 className="text-2xl font-bold text-center">
            {formTitle}
          </h1>
        </div>

        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            {...register("firstName")}
            type="text"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Apellido
          </label>
          <input
            {...register("lastName")}
            type="text"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500  p-2 outline-none"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Correo electrónico
          </label>
          <input
            {...register("email")}
            type="email"
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500  p-2 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="isActive" className="block text-sm font-medium">
            Estatus
          </label>
          <select
            {...register("isActive")}
            className="bg-gray-100 mt-1 block w-full border-b-2 border-gray-500 p-2 outline-none text-gray-600"
          >
            <option value="">Seleccionar estatus</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          {errors.isActive && (
            <p className="text-red-500 text-sm">{errors.isActive.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="md:w-1/4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer self-center"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default UserFormulario;
