import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MateriaInformacion from "../../../../components/MateriaInformacion";

const VerMateria = () => {
  const { id } = useParams();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await axios.get(`/api/subjects/${id}`);
        setMateria(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMateria();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!materia) {
    return <p>No se encontró la materia.</p>;
  }

  return (
    <MateriaInformacion
      codigo={materia.code}
      nombre={materia.name}
      descripcion={materia.description}
      unidadesCredito={materia.credits}
      id={materia._id} 
    />
  );
};

export default VerMateria;
