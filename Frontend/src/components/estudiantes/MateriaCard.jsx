import { FaBook, FaChalkboardTeacher } from "react-icons/fa";

export default function MateriaCard({ materia }) {
  return (
    <div className="border border-gray-100 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-2">
        <FaBook className="text-green-500 text-xl" />
        <h3 className="font-semibold text-gray-700">{materia.nombre}</h3>
      </div>
      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <FaChalkboardTeacher className="text-purple-500" />
        <p>Profesor: {materia.profesor}</p>
      </div>
      <div className="mt-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
          Calificación: {materia.calificacion}
        </span>
      </div>
    </div>
  );
}