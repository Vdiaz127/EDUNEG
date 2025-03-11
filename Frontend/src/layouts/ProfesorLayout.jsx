import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ProfesorLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar userType="teacher" userName="Profesor" />
      
      {/* Contenido principal ajustado para responsive */}
      <main className="flex-1 ml-0 lg:ml-60 p-4 overflow-x-auto min-h-screen">
        <div className=""> 
          <Outlet />
        </div>
      </main>
    </div>
  );
}