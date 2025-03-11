import MateriaCard from "./MateriaCard";
import { FaCalendarAlt } from "react-icons/fa";

export default function SemestreCard({ semestre }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-6 mb-6 bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <FaCalendarAlt className="text-blue-500 text-2xl" />
        <h2 className="text-xl font-bold text-gray-800">{semestre.nombre}</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        <span className="font-semibold">Fecha:</span> {semestre.fecha_inicio} - {semestre.fecha_fin}
      </p>
      <div className="space-y-3">
        {semestre.materias.map((materia) => (
          <MateriaCard key={materia.id} materia={materia} />
        ))}
      </div>
    </div>
  );
}