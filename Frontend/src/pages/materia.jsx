/*-------------------------------------------------------------------
|  🐼 React FC Form
|
|  🦝 Todo: CREATE AN AWESOME AND MAINTAINABLE FORM COMPONENT 
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import { BsMortarboardFill } from "react-icons/bs";

export const Materia = () => {


    return (
        <div className="pt-3 box-content container mx-auto lg:px-4">
            <h3 className="lg:ml-3 text-xl sm:text-3xl lg:text-5xl text-left font-semibold">
                Matematica I
            </h3>

            <div className="lg:ml-3 place-content-center w-full max-w-4xl mx-auto">
                <div className="mt-8 py-7 px-4 lg:px-14 grid gap-5 border-solid border-4">
                    <h4 className="text-lg sm:text-2xl lg:text-3xl text-left">
                        Evaluaciones pendientes
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        
                        <div className="relative w-full ">
                            <input
                                type="text"
                                placeholder="Nombre de la evaluación"
                                className="p-2  border border-gray-300 rounded-lg shadow-lg w-full py-5 "
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg">
                                Entregar
                            </button>
                        </div>

                        <div className="relative w-full ">
                            <input
                                type="text"
                                placeholder="Nombre de la evaluación"
                                className="p-2  border border-gray-300 rounded-lg shadow-lg w-full py-5 "
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg">
                                Entregar
                            </button>
                        </div>

                        <div className="relative w-full ">
                            <input
                                type="text"
                                placeholder="Nombre de la evaluación"
                                className="p-2  border border-gray-300 rounded-lg shadow-lg w-full py-5 "
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg">
                                Entregar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 py-7 px-4 lg:px-14 grid gap-5 border-solid border-4">
                    <h4 className="text-lg sm:text-2xl lg:text-3xl text-left">
                        Evaluaciones corregidas
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        
                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-5 flex justify-between items-center">
                            <div className="p-2  py-4 ">
                                <h3 className="text-xl font-bold">Proyecto 1</h3>
                                <h4 className="text-base text-gray-500">Clasificacion 0/100</h4>
                                <div className="mt-5 text-sm text-black-500">Comentario...</div>
                            </div>
                            <button className="border border-black-300 right-2 bg-white text-black px-4 py-2 rounded-lg">
                                Ver detalles
                            </button>
                        </div>

                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-5 flex justify-between items-center">
                            <div className="p-2  py-4 ">
                                <h3 className="text-xl font-bold">Proyecto 1</h3>
                                <h4 className="text-base text-gray-500">Clasificacion 0/100</h4>
                                <div className="mt-5 text-sm text-black-500">Comentario...</div>
                            </div>
                            <button className="border border-black-300 right-2 bg-white text-black px-4 py-2 rounded-lg">
                                Ver detalles
                            </button>
                        </div>

                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-5 flex justify-between items-center">
                            <div className="p-2  py-4 ">
                                <h3 className="text-xl font-bold">Proyecto 1</h3>
                                <h4 className="text-base text-gray-500">Clasificacion 0/100</h4>
                                <div className="mt-5 text-sm text-black-500">Comentario...</div>
                            </div>
                            <button className="border border-black-300 right-2 bg-white text-black px-4 py-2 rounded-lg">
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
