import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlanEvaluacion from "./PlanEvaluacion"; // Importa el formulario

const PlanEvaluacionPage = () => {
  const { sectionId } = useParams(); // Obtén el ID de la sección desde la URL
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtén los datos de la sección desde el backend
    const fetchSectionData = async () => {
      try {
        const response = await axios.get(`/api/sections/${sectionId}`);
        const sectionData = response.data;

        // Obtener los detalles de la materia y el semestre
        const subjectResponse = await axios.get(`/api/subjects/${sectionData.subjectId}`);
        const semesterResponse = await axios.get(`/api/semesters/${sectionData.semesterId}`);

        // Combinar los datos
        sectionData.subjectId = subjectResponse.data;
        sectionData.semesterId = semesterResponse.data;

        setSection(sectionData);
      } catch (error) {
        console.error("Error al obtener los datos de la sección:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [sectionId]);

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!section) {
    return <div className="text-center text-gray-500">Sección no encontrada</div>;
  }

  return (
    <div className="p-6">
      <PlanEvaluacion section={section} />
    </div>
  );
};

export default PlanEvaluacionPage;