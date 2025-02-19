import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MateriaInformacion from "../../../components/MateriaInformacion";

const VerMateria = () => {
  const { id } = useParams();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const response = await axios.get(`/api/subjects/${id}`);
        setMateria(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
        setError("Error al cargar la información de la materia");
      } finally {
        setLoading(false);
      }
    };

    fetchMateria();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!materia) return <div>Materia no encontrada</div>;

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
