import { useState } from "react";
import PlanEvaluacion from "../../components/PlanEvaluacion";

const PlanDeEvaluacion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="py-2 px-4 bg-black text-white rounded-md m-2 cursor-pointer" onClick={openModal}>Crear Plan de Evaluación</button>
      <PlanEvaluacion isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default PlanDeEvaluacion;
