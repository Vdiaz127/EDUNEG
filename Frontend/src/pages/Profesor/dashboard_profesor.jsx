import { BsMortarboardFill } from "react-icons/bs";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/context/UserContext'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

export const DashboardProfesor = () => {
    const [subjects, setSubjects] = useState([]);
    const { user } = useContext(UserContext); // Obtén el usuario desde el contexto

    useEffect(() => {
        const fetchSubjects = async () => {
            if (!user) return; // Asegúrate de que el usuario esté disponible

            try {
                const response = await axios.get(`/api/sections/professor/${user.id}`);
                const subjectIds = Array.isArray(response.data) ? response.data : [];

                const subjectsData = await Promise.all(subjectIds.map(async (subjectId) => {
                    const subjectResponse = await axios.get(`/api/subjects/${subjectId}`);
                    return { id: subjectId, data: subjectResponse.data };
                }));

                setSubjects(subjectsData);
            } catch (error) {
                console.error("Error fetching subjects:", error.response ? error.response.data : error.message);
            }
        };

        fetchSubjects();
    }, [user]);

    return (
        <div className="pt-3 box-content container mx-auto lg:px-4">
            <h3 className="lg:ml-3 text-xl sm:text-3xl lg:text-5xl text-left font-semibold">
                Dashboard - Profesor
            </h3>

            <div className="lg:ml-3 place-content-center w-full max-w-4xl mx-auto">
                <div className="mt-8 py-7 px-4 lg:px-14 grid gap-5 border-solid border-4">
                    <h4 className="text-lg sm:text-2xl lg:text-3xl text-left">
                        Asignaturas 
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subjects.map((subject, index) => (
                            <div key={subject.id || index} className="p-6 border border-gray-300 rounded-lg shadow-lg">
                                <h4 className="text-lg sm:text-xl font-bold">{subject.data.name || 'Cargando...'}</h4>

                                <div className="flex items-center space-x-4 mt-4">
                                    <button className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-50 hover:text-blue-950">
                                        Ver Detalles
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <BsMortarboardFill className="text-3xl text-black" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 py-7 h-40 max-w-xl mx-auto"></div>
            </div>
        </div>
    );
};
