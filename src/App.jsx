// src/App.jsx (Actualizado para el enrutamiento)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavegacionEstelar from './components/NavegacionEstelar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import EstadisticasPersonales from './pages/EstadisticasPersonales';
import FormularioJuego from './pages/FormularioJuego';

import './styles/Global.css'; 

export default function App() {
  return (
    <Router>
      <Routes>
        {/* RUTA PADRE: Renderiza NavegacionEstelar y define el layout */}
        <Route path="/" element={<NavegacionEstelar />}> 
          
          {/* RUTAS HIJAS: Se renderizan dentro del <Outlet /> de NavegacionEstelar */}
          <Route index element={<BibliotecaJuegos />} /> {/* Ruta: / */}
          
          <Route path="agregar" element={<FormularioJuego />} /> {/* Ruta: /agregar */}
          
          <Route path="editar/:id" element={<FormularioJuego />} />

          <Route path="estadisticas" element={<EstadisticasPersonales />} /> {/* Ruta: /estadisticas */}
          
          <Route path="*" element={<h2>¡404! Navegación fuera del mapa estelar.</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}