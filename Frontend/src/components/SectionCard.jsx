import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SectionCard = ({ subjectId, semesterId, sectionNumber, arrayStudents, profesorId }) => {
    const [subjectName, setSubjectName] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [studentNames, setStudentNames] = useState([]);

    useEffect(() => {
        const fetchSubjectName = async () => {
            try {
                const response = await axios.get(`/api/subjects/${subjectId}`);
                setSubjectName(response.data.name);
            } catch (error) {
                console.error("Error fetching subject name:", error);
            }
        };

        const fetchProfessorName = async () => {
            try {
                const response = await axios.get(`/api/professors/${profesorId}`);
                setProfessorName(`${response.data.firstName} ${response.data.lastName}`);
            } catch (error) {
                console.error("Error fetching professor name:", error);
            }
        };

        const fetchStudentNames = async () => {
            try {
                const studentPromises = arrayStudents.map(studentId =>
                    axios.get(`/api/students/${studentId}`)
                );
                const studentResponses = await Promise.all(studentPromises);
                setStudentNames(studentResponses.map(res => `${res.data.firstName} ${res.data.lastName}`));
            } catch (error) {
                console.error("Error fetching student names:", error);
            }
        };

        fetchSubjectName();
        fetchProfessorName();
        fetchStudentNames();
    }, [subjectId, profesorId, arrayStudents]);

    return (
        <div className="section-card">
            <h2><strong>Numero de seccion</strong> {sectionNumber}</h2>
            <p><strong>Materia:</strong> {subjectName}</p>
            <p><strong>Semestre:</strong> {semesterId}</p>
            <p><strong>Profesor:</strong> {professorName}</p>
            <p><strong>Estudiantes:</strong> {studentNames.length}</p>
            {/* <ul>
                {studentNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul> */}
            {/* <a href={`/sections/${sectionNumber}`}>Ver más</a> */}
        </div>
    );
};

SectionCard.propTypes = {
    subjectId: PropTypes.string.isRequired,
    semesterId: PropTypes.string.isRequired,
    sectionNumber: PropTypes.string.isRequired,
    arrayStudents: PropTypes.array.isRequired,
    profesorId: PropTypes.string.isRequired,
};

export default SectionCard;