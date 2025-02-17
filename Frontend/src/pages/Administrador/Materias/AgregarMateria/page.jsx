import MateriasFormulario from "../../../../components/MateriasFormulario";


const handleSubmit = (data) => {
  // Aquí tu lógica para enviar a API
  console.log(userData);
};

const FormularioMateria = () => {
  return (
    <div className="">
      {/* Para crear nueva materia */}
      <MateriasFormulario onSubmit={handleSubmit} />
      {/* Para editar materia existente */}
{/*       <MateriasFormulario
        initialData={{
          codigo: "MAT-101",
          nombre: "Matemáticas Básicas",
          descripcion: "Curso introductorio de matemáticas",
          unidadesCreditos: 3,
        }}
        onSubmit={handleSubmit}
      />  */}
    </div>
  );
};

export default FormularioMateria;
