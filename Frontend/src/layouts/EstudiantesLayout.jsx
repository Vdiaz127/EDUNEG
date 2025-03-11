import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function EstudianteLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Contenido principal */}
      <main className="flex-1 ml-0 lg:ml-64 p-6 overflow-x-auto bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}