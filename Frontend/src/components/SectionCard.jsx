import React from "react";
import PropTypes from "prop-types";

const SectionCard = ({
    subjectId,
    semesterId,
    sectionNumber,
    profesorId,
    arrayStudents,
    semesterName, // Nueva prop para el nombre del semestre
    subjectName,  // Nueva prop para el nombre de la materia
    professorName // Nueva prop para el nombre del profesor
}) => {
    return (
        <div className="space-y-2">
            <p className="text-lg font-semibold">Materia: {subjectName}</p>
            <p className="text-lg font-semibold">Semestre: {semesterName}</p>
            <p className="text-lg font-semibold">Sección: {sectionNumber}</p>
            <p className="text-lg font-semibold">Profesor: {professorName}</p>
            <p className="text-lg font-semibold">Estudiantes: {arrayStudents.length}</p>
        </div>
    );
};

SectionCard.propTypes = {
    subjectId: PropTypes.string.isRequired,
    semesterId: PropTypes.string.isRequired,
    sectionNumber: PropTypes.string.isRequired,
    profesorId: PropTypes.string.isRequired,
    arrayStudents: PropTypes.arrayOf(PropTypes.string).isRequired,
    semesterName: PropTypes.string.isRequired, // Validación para el nombre del semestre
    subjectName: PropTypes.string.isRequired,  // Validación para el nombre de la materia
    professorName: PropTypes.string.isRequired // Validación para el nombre del profesor
};

export default SectionCard;