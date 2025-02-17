import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Aquí tu navbar o header común */}
      <main>
        <Outlet /> {/* Aquí se renderizarán las páginas */}
      </main>
      {/* Footer común si es necesario */}
    </div>
  );
};

export default Layout;
