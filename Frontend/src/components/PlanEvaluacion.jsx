import React, { useState } from "react";
import Swal from "sweetalert2";

const PlanEvaluacion = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);

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

  const resetModal = () => {
    setDescription("");
    setAssignments([]);
    setTotalWeight(0);
  };

  const handleSubmit = () => {
    if (totalWeight === 100) {
      const planEvaluacionData = {
        description: description,
        assignments: assignments.map((assignment) => ({
          title: assignment.title,
          description: assignment.description,
          date: assignment.date,
          weight: assignment.weight,
        })),
      };

      console.log("Plan de Evaluación:", planEvaluacionData);

      simularEnvioAPI(planEvaluacionData)
        .then(() => {
          Swal.fire({
            title: "¡Éxito!",
            text: "El plan de evaluación se ha creado correctamente.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            resetModal();
            onClose();
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "¡Error!",
            text: "Ocurrió un error al crear el plan de evaluación.",
            icon: "error",
            confirmButtonText: "Ok",
          });
          console.error("Error al enviar a la API:", error);
        });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "La ponderación total debe ser igual a 100%.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const simularEnvioAPI = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = Math.random() > 0.2;

        if (exito) {
          resolve();
        } else {
          reject(new Error("Simulación de error en la API"));
        }
      }, 1500);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto flex justify-center items-start z-50 py-10">
      {" "}
      {/* Cambio aquí */}
      <div className="bg-white p-6 rounded shadow-md w-4/5 max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenedor para el título y el botón */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Plan de Evaluación</h2>
          {description && (
            <button
              onClick={totalWeight === 100 ? handleSubmit : addAssignment}
              className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2 cursor-pointer  ${
                totalWeight === 100
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : totalWeight < 100
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
              disabled={totalWeight > 100}
            >
              {totalWeight === 100
                ? "Crear Plan de Evaluación"
                : "Agregar Asignación"}
            </button>
          )}
        </div>

        {/* Contenedor principal para la descripción y las asignaciones */}
        <div className="flex flex-col md:flex-row">
          {/* Descripción */}
          <div className="w-full md:w-1/3 border flex items-center justify-center">
            <textarea
              id="description"
              placeholder="Ingrese una descripción"
              value={description}
              onChange={handleDescriptionChange}
              className="bg-gray-100 outline-none px-1 block w-full sm:text-sm  resize-none h-full"
            />
          </div>

          {/* Contenedor para las asignaciones */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Encabezados de la tabla */}
              <div className="p-2 border font-semibold text-center">
                Asignación
              </div>
              <div className="p-2 border font-semibold text-center">Fecha</div>
              <div className="p-2 border font-semibold text-center">
                Ponderación
              </div>

              {/* Filas de asignaciones */}
              {assignments.map((assignment, index) => (
                <React.Fragment key={assignment.assignmentId}>
                  {/* Asignación */}
                  <div className="p-2 border flex flex-col">
                    <div className="font-semibold">
                      Asignación #{assignment.assignmentNumber}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Título:
                      </label>
                      <input
                        type="text"
                        value={assignment.title}
                        onChange={(e) =>
                          handleAssignmentChange(index, "title", e.target.value)
                        }
                        disabled={!description}
                        className="bg-gray-100 shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Descripción:
                      </label>
                      <textarea
                        value={assignment.description}
                        onChange={(e) =>
                          handleAssignmentChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        disabled={!description}
                        className="bg-gray-100 shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none resize-none flex-grow"
                      />
                    </div>
                    <button
                      onClick={() => deleteAssignment(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* Fecha */}
                  <div className="p-2 border flex items-center justify-center">
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
                      disabled={!description}
                      className="bg-gray-100 shadow-sm block w-full sm:text-sm border border-gray-400 rounded py-4 px-2"
                    />
                  </div>

                  {/* Ponderación */}
                  <div className="p-2 border flex items-center justify-center">
                    <input
                      type="number"
                      value={assignment.weight}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (Number(value) >= 0 &&
                            Number(value) <= 25 &&
                            totalWeight -
                              Number(assignment.weight || 0) +
                              Number(value) <=
                              100)
                        ) {
                          handleAssignmentChange(index, "weight", value);
                        }
                      }}
                      disabled={!description}
                      className="bg-gray-100 px-2 py-4 shadow-sm block w-full sm:text-sm border border-gray-400 rounded-md outline-none"
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Total Weight */}
        <div className="mt-4 text-right">Total: {totalWeight}%</div>
      </div>
    </div>
  );
};

export default PlanEvaluacion;
