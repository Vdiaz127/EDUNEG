import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard";
import Modal from "react-modal";
import { FaEye, FaTrash } from "react-icons/fa";

const SeccionesPage = () => {
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);
    const [newSection, setNewSection] = useState({
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
                const [sectionsResponse, subjectsResponse, professorsResponse, studentsResponse, semestersResponse] = await Promise.all([
                    axios.get(`/api/sections`),
                    axios.get(`/api/subjects`),
                    axios.get(`/api/professors`),
                    axios.get(`/api/students`),
                    axios.get(`/api/semesters`) // Obtener la lista de semestres
                ]);

                // Guardar los datos
                setSections(sectionsResponse.data);
                setSubjects(subjectsResponse.data);
                setProfessors(professorsResponse.data);
                setStudents(studentsResponse.data);
                setSemesters(semestersResponse.data);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error al cargar la información");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Función para obtener el nombre del semestre a partir del semesterId
    const getSemesterName = (semesterId) => {
        const semester = semesters.find(sem => sem._id === semesterId);
        return semester ? `Semestre ${semester.periodo} - ${semester.año}` : "Semestre no encontrado";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSection({ ...newSection, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setNewSection((prevState) => {
            const arrayStudents = checked
                ? [...prevState.arrayStudents, value]
                : prevState.arrayStudents.filter((id) => id !== value);
            return { ...prevState, arrayStudents };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/sections", newSection);
            setSections([...sections, response.data]);
            setModalIsOpen(false);
        } catch (error) {
            console.error("Error creating section:", error);
            setError("Error al crear la sección");
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/administrador/secciones/ver/${id}`);
    };

    const openDeleteModal = (section) => {
        setSectionToDelete(section);
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
        setSectionToDelete(null);
    };

    const handleDelete = async () => {
        if (sectionToDelete) {
            try {
                await axios.delete(`/api/sections/${sectionToDelete._id}`);
                setSections(sections.filter(section => section._id !== sectionToDelete._id));
                closeDeleteModal();
            } catch (error) {
                console.error("Error deleting section:", error);
                setError("Error al eliminar la sección");
                closeDeleteModal();
            }
        }
    };

    if (loading) return <div className="text-center text-gray-500">Cargando...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-700">Gestión de Secciones</h1>
                    <button 
                        onClick={() => setModalIsOpen(true)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                        Agregar Sección
                    </button>
                </div>
                {sections.length === 0 ? (
                    <div className="text-center text-gray-500">No se encontraron secciones registradas</div>
                ) : (
                    <div className="space-y-4">
                        {sections.map((section) => (
                            <div key={section._id} className="relative p-4 bg-gray-50 rounded-lg shadow">
                                <SectionCard 
                                    {...section}
                                    semesterName={getSemesterName(section.semesterId)} // Pasar el nombre del semestre
                                />
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button 
                                        onClick={() => handleViewDetails(section._id)} 
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <FaEye />
                                    </button>
                                    <button 
                                        onClick={() => openDeleteModal(section)} 
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Agregar Nueva Sección</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700 font-medium">Materia:</span>
                        <select 
                            name="subjectId" 
                            value={newSection.subjectId} 
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
                        <select 
                            name="semesterId" 
                            value={newSection.semesterId} 
                            onChange={handleInputChange} 
                            required 
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione un semestre</option>
                            {semesters.map(semester => (
                                <option key={semester._id} value={semester._id}>
                                    Semestre {semester.periodo} - {semester.año}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Número de Sección:</span>
                        <input 
                            type="text" 
                            name="sectionNumber" 
                            value={newSection.sectionNumber} 
                            onChange={handleInputChange} 
                            required 
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Profesor:</span>
                        <select 
                            name="profesorId" 
                            value={newSection.profesorId} 
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
                                        checked={newSection.arrayStudents.includes(student.id)}
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
            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full mx-4 md:mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        ¿Estás seguro de que deseas eliminar esta sección?
                        {sectionToDelete && (
                            <span className="block font-semibold mt-2">
                                {sectionToDelete.sectionNumber}
                            </span>
                        )}
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Eliminar
                        </button>
                        <button
                            onClick={closeDeleteModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SeccionesPage;