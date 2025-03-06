import React, { useState } from "react";
import Swal from "sweetalert2";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const PlanEvaluacion = ({ section }) => {
  const [description, setDescription] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const navigate = useNavigate();
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addAssignment = () => {
    const newAssignmentNumber = assignments.length + 1;
    setAssignments([
      ...assignments,
      {
        assignmentNumber: newAssignmentNumber,
        title: "",
        description: "",
        date: "",
        weight: "",
        assignmentId: Date.now(),
      },
    ]);
  };

  const handleAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    setAssignments(updatedAssignments);

    if (field === "weight") {
      recalculateTotalWeight(updatedAssignments);
    }
  };

  const recalculateTotalWeight = (updatedAssignments) => {
    const newTotalWeight = updatedAssignments.reduce(
      (sum, assignment) => sum + Number(assignment.weight || 0),
      0
    );
    setTotalWeight(newTotalWeight);
  };

  const deleteAssignment = (index) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
    recalculateTotalWeight(updatedAssignments);
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate >= currentDate;
  };

  const resetForm = () => {
    setDescription("");
    setAssignments([]);
    setTotalWeight(0);
  };

  const handleSubmit = async () => {
    if (totalWeight === 100) {
      const planEvaluacionData = {
        description,
        assignments: assignments.map((assignment) => ({
          title: assignment.title,
          description: assignment.description,
          date: assignment.date,
          weight: assignment.weight,
        })),
        sectionId: section._id, // Añadir el ID de la sección
      };

      try {
        const response = await axios.post('/api/evaluation-plans', planEvaluacionData);
        if (response.status === 201) {
          Swal.fire({
            title: "¡Éxito!",
            text: `Plan de evaluación "${response.data.evaluationPlan.name}" creado correctamente.`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            resetForm();
            navigate('/profesor'); // Redirigir al profesor a la pantalla principal
          });
        }
      } catch (error) {
        Swal.fire({
          title: "¡Error!",
          text: "Ocurrió un error al crear el plan de evaluación.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error("Error al enviar a la API:", error);
      }
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "La ponderación total debe ser exactamente 100%.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Encabezado con resumen */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Crear Plan de Evaluación
        </h2>
        <p className="text-gray-600">
          Materia: <span className="font-semibold">{section.subjectId.name}</span> |
          Sección: <span className="font-semibold">{section.sectionNumber}</span> |
          Semestre: <span className="font-semibold">{section.semesterId.periodo} - {section.semesterId.año}</span>
        </p>
      </div>

      {/* Descripción del plan */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Descripción del Plan (Opcional)
        </label>
        <textarea
          id="description"
          placeholder="Ingrese una descripción general del plan de evaluación"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      {/* Tabla de evaluaciones */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Evaluaciones
        </label>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border border-gray-200">
                  Nombre
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Fecha
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Ponderación
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.assignmentId} className="border-b">
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="text"
                      value={assignment.title}
                      onChange={(e) =>
                        handleAssignmentChange(index, "title", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre de la evaluación"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="date"
                      value={assignment.date}
                      onChange={(e) => {
                        const date = e.target.value;
                        if (validateDate(date)) {
                          handleAssignmentChange(index, "date", date);
                        } else {
                          alert(
                            "La fecha debe ser mayor o igual a la fecha actual."
                          );
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={assignment.weight}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (Number(value) >= 0 &&
                            totalWeight -
                              Number(assignment.weight || 0) +
                              Number(value) <=
                              100)
                        ) {
                          handleAssignmentChange(index, "weight", value);
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ponderación"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <button
                      onClick={() => deleteAssignment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón para agregar evaluaciones */}
      <div className="flex justify-end mb-4">
        <button
          onClick={addAssignment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Agregar Evaluación
        </button>
      </div>

      {/* Total de ponderación */}
      <div className="text-right mb-4">
        <span className="font-semibold">Total: {totalWeight}%</span>
      </div>

      {/* Botón para crear el plan de evaluación */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={totalWeight !== 100}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
            totalWeight !== 100 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Crear Plan de Evaluación
        </button>
      </div>
    </div>
  );
};

export default PlanEvaluacion;