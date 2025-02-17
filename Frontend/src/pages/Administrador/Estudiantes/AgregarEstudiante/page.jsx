import UserFormulario from "../../../../components/UserFormulario";

const handleSubmit = (data) => {
  // Los valores vienen parseados correctamente
  const userData = {
    ...data,
    estatus: data.estatus === "true",
  };

  // Aquí tu lógica para enviar a API
  console.log(userData);
};

const FormularioEstudiante = () => {
  return (
    // Para un nuevo usuario
    <UserFormulario onSubmit={handleSubmit} rol={"Estudiante"} />
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

export default FormularioEstudiante;
