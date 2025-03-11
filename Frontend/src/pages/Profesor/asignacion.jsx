/*-------------------------------------------------------------------
|  🐼 React FC Form
|
|  🦝 Todo: CREATE AN AWESOME AND MAINTAINABLE FORM COMPONENT 
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import { BsMortarboardFill } from "react-icons/bs";

export const Asignacion = () => {


    return (
        <div className="pt-3 box-content container mx-auto lg:px-4">
            <h3 className="lg:ml-3 text-xl sm:text-3xl lg:text-5xl text-left font-semibold">
                Asignación N°6 Trabajo Final 20%
            </h3>

            <div className="lg:ml-3 place-content-center w-full max-w-4xl mx-auto">
                <div className="mt-8 py-7 px-4 lg:px-14 grid gap-5 border-solid border-4">
                    <h4 className="text-lg sm:text-2xl lg:text-3xl text-left">
                        Estado de la entrega
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-2 flex justify-between items-center">
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base text-gray-500">Estado de la Entrega: </h4>
                            </div>
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base font-bold text-black-500">No entregado</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-2 flex justify-between items-center">
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base text-gray-500">Estado de la clasificación: </h4>
                            </div>
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base font-bold text-black-500">Sin calificar</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-2 flex justify-between items-center">
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base text-gray-500">Fecha de entrega: </h4>
                            </div>
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base font-bold text-black-500">lunes, 24 de febrero de 2025, 23:59</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-2 flex justify-between items-center">
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base text-gray-500">Tiempo restante: </h4>
                            </div>
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base font-bold text-black-500">1 dia 5 horas</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="p-2 border border-gray-300 rounded-lg shadow-lg w-full py-2 flex justify-between items-center">
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base text-gray-500">Última modificación: </h4>
                            </div>
                            <div className="p-2 pr-24 py-4 ">
                                <h4 className="text-base font-bold text-black-500">-</h4>
                            </div>
                        </div>
                    </div>

                    <div className=" mt-5  mx-auto">
                        <button className=" bg-black text-white px-4 py-2 rounded-lg">
                            Entregar
                        </button>
                    </div>
                </div>

                

            </div>

            
        </div>
  )
}
