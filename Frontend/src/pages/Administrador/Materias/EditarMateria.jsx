import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import MateriaFormulario from "../../../components/MateriasFormulario";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const EditarMateria = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [materia, setMateria] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMateria = async () => {
            try {
                const response = await axios.get(`/api/subjects/${id}`);
                setMateria(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener materia:", error);
                setError("Error al cargar la información de la materia");
                setLoading(false);
            }
        };

        fetchMateria();
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            const materiaData = {
                ...data,
                credits: parseInt(data.credits, 10)
            };

            await axios.put(`/api/subjects/${id}`, materiaData);
            
            toast.success("Materia actualizada exitosamente");
            navigate("/administrador/materias");
        } catch (error) {
            console.error("Error al actualizar materia:", error);
            toast.error(error.response?.data?.message || "Error al actualizar la materia");
            setError("Error al actualizar la materia");
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!materia) return <div>Materia no encontrada</div>;

    return (
        <MateriaFormulario 
            onSubmit={handleSubmit}
            initialData={{
                code: materia.code,
                name: materia.name,
                description: materia.description,
                credits : materia.credits,
                id: materia._id,
            }}
            isEditing={true}
            submitButtonText="Actualizar Materia"
            returnUrl="/administrador/materias"
        />
    );
};

export default EditarMateria;