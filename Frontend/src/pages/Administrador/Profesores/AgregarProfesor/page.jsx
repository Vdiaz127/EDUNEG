import UserFormulario from "../../../../components/UserFormulario";

// En tu componente padre
const handleSubmit = (data) => {
  // Los valores vienen parseados correctamente
  const userData = {
    ...data,
    estatus: data.estatus === "true", // Convertir a boolean
  };

  // Aquí tu lógica para enviar a API
  console.log(userData);
};

const FormularioProfesor = () => {
  return (
    // Para un nuevo usuario
    <UserFormulario onSubmit={handleSubmit} rol={"Profesor"} />
    // Para actualizar usuario
/*     <UserFormulario
      initialData={{
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@example.com",
        estatus: "true",
      }}
      onSubmit={handleSubmit}
      rol="Profesor"
    /> */
  );
};

export default FormularioProfesor;
