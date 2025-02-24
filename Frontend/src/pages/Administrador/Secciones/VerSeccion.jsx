import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { IoIosSkipBackward, IoIosWarning, IoIosAlert, IoIosSync, IoIosCreate } from "react-icons/io";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const VerSeccion = () => {
    const { id } = useParams();
    const [section, setSection] = useState(null);
    const [subjectName, setSubjectName] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [studentNames, setStudentNames] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updatedSection, setUpdatedSection] = useState({
        subjectId: "",
        semesterId: "",
        sectionNumber: "",
        arrayStudents: [],
        profesorId: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sectionResponse, subjectsResponse, professorsResponse, studentsResponse] = await Promise.all([
                    axios.get(`/api/sections/${id}`),
                    axios.get(`/api/subjects`),
                    axios.get(`/api/professors`),
                    axios.get(`/api/students`)
                ]);

                setSection(sectionResponse.data);
                setUpdatedSection(sectionResponse.data);
                setSubjects(subjectsResponse.data);
                setProfessors(professorsResponse.data);
                setStudents(studentsResponse.data);

                const subjectResponse = await axios.get(`/api/subjects/${sectionResponse.data.subjectId}`);
                setSubjectName(subjectResponse.data.name);

                const professorResponse = await axios.get(`/api/professors/${sectionResponse.data.profesorId}`);
                setProfessorName(`${professorResponse.data.firstName} ${professorResponse.data.lastName}`);

                const studentResponses = await Promise.all(
                    sectionResponse.data.arrayStudents.map(studentId => axios.get(`/api/students/${studentId}`))
                );
                setStudentNames(studentResponses.map(res => `${res.data.firstName} ${res.data.lastName}`));

                setLoading(false);
            } catch (error) {
                console.error("Error al obtener la sección:", error);
                setError("Error al cargar la información de la sección");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSection({ ...updatedSection, [name]: value });
    };

    const handleSelectChange = (e) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
        setUpdatedSection({ ...updatedSection, [name]: selectedValues });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setUpdatedSection(prevState => {
            const arrayStudents = checked
                ? [...prevState.arrayStudents, value]
                : prevState.arrayStudents.filter(studentId => studentId !== value);
            return { ...prevState, arrayStudents };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/sections/${id}`, updatedSection);
            setSection(updatedSection);
            setModalIsOpen(false);
            navigate(`/administrador/secciones`);
            
        } catch (error) {
            console.error("Error al actualizar la sección:", error);
            setError("Error al actualizar la sección");
        }
    };

    if (loading) return <IoIosSync className="animate-spin w-10 h-10" />;
    if (error) return <div className="flex items-center text-red-600"><IoIosAlert className="w-6 h-6 mr-2" />{error}</div>;
    if (!section) return <div className="flex items-center text-yellow-600"><IoIosWarning className="w-6 h-6 mr-2" />Sección no encontrada</div>;

    return (
        <div className="flex flex-col justify-center items-center h-screen m-5">
            <div className="md:w-1/2 flex flex-col items-center text-center border-2 border-gray-200 rounded-lg shadow-lg py-8 px-5">
                <h1 className="mb-6 text-2xl font-bold text-center">
                    Información de la Sección
                </h1>
                <div className="w-full md:w-4/5 items-center mb-4 gap-5">
                    <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
                        <p className="text-lg font-semibold flex items-center gap-2">
                            Materia
                        </p>
                        <p className="font-bold text-lg">
                            {subjectName}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-4/5 items-center mb-4 gap-5">
                    <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
                        <p className="text-lg font-semibold flex items-center gap-2">
                            Semestre
                        </p>
                        <p className="font-bold text-lg">
                            {section.semesterId}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-4/5 items-center mb-4 gap-5">
                    <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
                        <p className="text-lg font-semibold flex items-center gap-2">
                            Número de la Sección
                        </p>
                        <p className="font-bold text-lg">
                            {section.sectionNumber}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-4/5 items-center mb-4 gap-5">
                    <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
                        <p className="text-lg font-semibold flex items-center gap-2">
                            Profesor
                        </p>
                        <p className="font-bold text-lg">
                            {professorName}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-4/5 items-center mb-4 gap-5">
                    <div className="w-full bg-gray-100 border-2 border-gray-300 py-4 px-5 rounded-lg shadow-md flex flex-col md:flex-row text-start justify-between flex-wrap gap-2">
                        <p className="text-lg font-semibold flex items-center gap-2">
                            Estudiantes
                        </p>
                        <ul className="font-bold text-lg">
                            {studentNames.map((student, index) => (
                                <li key={index}>{student}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button 
                    onClick={() => setModalIsOpen(true)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                >
                    <IoIosCreate className="w-5 h-5" />
                    Editar Sección
                </button>
            </div>
            <div className="mt-4 w-1/2 flex justify-center md:justify-between items-center flex-wrap gap-4">
                <Link to="/administrador/secciones">
                    <button className="bg-black text-white flex justify-center items-center gap-2 px-8 py-2 text-center rounded-md shadow-md cursor-pointer">
                        <IoIosSkipBackward className="w-5 h-5" />
                        Regresar
                    </button>
                </Link>
            </div>
            <Modal  
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 md:mx-auto transition-all transform scale-100"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Editar Sección</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700 font-medium">Materia:</span>
                        <select 
                            name="subjectId" 
                            value={updatedSection.subjectId} 
                            onChange={handleInputChange} 
                            required 
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione una materia</option>
                            {subjects.map(subject => (
                                <option key={subject._id} value={subject._id}>{subject.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Semestre:</span>
                        <input 
                            type="text" 
                            name="semesterId" 
                            value={updatedSection.semesterId} 
                            onChange={handleInputChange} 
                            required 
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Número de Sección:</span>
                        <input 
                            type="text" 
                            name="sectionNumber" 
                            value={updatedSection.sectionNumber} 
                            onChange={handleInputChange} 
                            required 
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Profesor:</span>
                        <select 
                            name="profesorId" 
                            value={updatedSection.profesorId} 
                            onChange={handleInputChange} 
                            required 
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione un profesor</option>
                            {professors.map(professor => (
                                <option key={professor.id} value={professor.id}>{`${professor.firstName} ${professor.lastName}`}</option>
                            ))}
                        </select>
                    </label>
                    <fieldset>
                        <legend className="text-gray-700 font-medium">Estudiantes:</legend>
                        <div className="mt-2 space-y-3">
                            {students.map((student) => (
                                <div key={student.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="arrayStudents"
                                        value={student.id}
                                        checked={updatedSection.arrayStudents.includes(student.id)}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-800">{`${student.firstName} ${student.lastName}`}</span>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <div className="flex justify-end space-x-4">
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                        >
                            Guardar
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setModalIsOpen(false)} 
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default VerSeccion;
