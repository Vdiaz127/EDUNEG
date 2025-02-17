import UserInformacion from "../../../../components/UserInformacion";

const VerEstudiante = () => {
  return (
    <UserInformacion 
      nombre={"Dionner"}
      apellido={"Figueras"}
      email={"dionnerfigueras@gmail.com"}
      estatus={true}
      rol={"Estudiante"}
    />
  );
};

export default VerEstudiante;
