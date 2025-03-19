import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlanEvaluacion from "./PlanEvaluacion"; 
import Swal from "sweetalert2";

const PlanEvaluacionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [evaluationPlan, setEvaluationPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        // Obtén los datos de la sección
        const response = await axios.get(`/api/sections/${sectionId}`);
        console.log(`/api/sections/${sectionId}`);
        const sectionData = response.data;
        console.log("Datos de la sección:", sectionData);

        // Obtener los detalles de la materia y el semestre
        const subjectResponse = await axios.get(`/api/subjects/${sectionData.subjectId}`);
        const semesterResponse = await axios.get(`/api/semesters/${sectionData.semesterId}`);

        // Combinar los datos
        sectionData.subjectId = subjectResponse.data;
        sectionData.semesterId = semesterResponse.data;
        setSection(sectionData);

        // Determinar el nombre del plan de evaluación para esta sección
        const planName = `Plan de evaluación - Sección ${sectionData.sectionNumber}`;

        // Obtener todos los planes de evaluación y filtrar por el nombre
        const plansResponse = await axios.get(`/api/evaluation-plans`);
        const foundPlan = plansResponse.data.find(plan => plan.name === planName);
        if (foundPlan) {
          setEvaluationPlan(foundPlan);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la sección:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [sectionId]);

  const handleDeletePlan = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará el plan de evaluación y todas sus evaluaciones asociadas.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await axios.delete(`/api/evaluation-plans/${evaluationPlan._id}`);
        Swal.fire("Eliminado!", "El plan se eliminó correctamente.", "success");
        setEvaluationPlan(null);
      }
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
      Swal.fire("Error", "No se pudo eliminar el plan de evaluación.", "error");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (!section) {
    return <div className="text-center text-gray-500">Sección no encontrada</div>;
  }

  return (
    <div className="p-6">
      {evaluationPlan ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Plan de Evaluación Existente</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Nombre:</span> {evaluationPlan.name}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Descripción:</span> {evaluationPlan.description || "Sin descripción"}
          </p>
          <button
            onClick={handleDeletePlan}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Eliminar Plan de Evaluación
          </button>
        </div>
      ) : (
        <PlanEvaluacion section={section} />
      )}
    </div>
  );
};

export default PlanEvaluacionPage;
