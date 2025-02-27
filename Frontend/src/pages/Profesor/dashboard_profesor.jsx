/*-------------------------------------------------------------------
|  🐼 React FC Form
|
|  🦝 Todo: CREATE AN AWESOME AND MAINTAINABLE FORM COMPONENT 
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import { BsMortarboardFill } from "react-icons/bs";

export const DashboardProfesor = () => {


    return (
        <div className="pt-3 box-content container mx-auto lg:px-4">
            <h3 className="lg:ml-3 text-xl sm:text-3xl lg:text-5xl text-left font-semibold">
                Dashboard - Profesor
            </h3>

            <div className="lg:ml-3 place-content-center w-full max-w-4xl mx-auto">
                <div className="mt-8 py-7 px-4 lg:px-14 grid gap-5 border-solid border-4">
                <h4 className="text-lg sm:text-2xl lg:text-3xl text-left">
                    Asignaturas Semestre 2024 - II
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
                        <h4 className="text-lg sm:text-xl font-bold">Matemática I</h4>
                        <div className="flex items-center space-x-4 mt-4">
                            <button className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-50 hover:text-blue-950">
                            Ver Detalles
                            </button>
                            <div className="flex items-center space-x-2">
                            <BsMortarboardFill className="text-3xl text-black" />
                            <label className="font-bold text-lg">18</label>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border border-gray-300 rounded-lg shadow-lg">
                        <h4 className="text-lg sm:text-xl font-bold">Matemática II</h4>
                        <div className="flex items-center space-x-4 mt-4">
                            <button className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-50 hover:text-blue-950">
                            Ver Detalles
                            </button>
                            <div className="flex items-center space-x-2">
                            <BsMortarboardFill className="text-3xl text-black" />
                            <label className="font-bold text-lg">15</label>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>

                <div className="mt-8 py-7 h-40 max-w-xl mx-auto"></div>
            </div>
        </div>
  )
}
