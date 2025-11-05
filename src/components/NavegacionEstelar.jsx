// src/components/NavegacionEstelar.jsx

import { Link, Outlet } from 'react-router-dom';

export default function NavegacionEstelar() {
  return (
    <>
      <nav className="barra-navegacion">
        <Link to="/">🚀 Explorador GameTracker</Link>
        <div>
          <Link to="/">Biblioteca</Link>
          <Link to="/agregar">Nueva Misión</Link>
          <Link to="/estadisticas">Bitácora de Vuelo</Link>
        </div>
      </nav>
      {/* El Outlet renderiza el componente de la ruta activa */}
      <div className="contenedor-principal">
        <Outlet />
      </div>
    </>
  );
}