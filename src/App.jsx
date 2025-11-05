// src/App.jsx (Actualizado para el enrutamiento)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavegacionEstelar from './components/NavegacionEstelar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import EstadisticasPersonales from './pages/EstadisticasPersonales';
// Importaremos el FormularioJuego después

import './styles/Global.css'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavegacionEstelar />}>
          {/* Rutas Hijas */}
          <Route index element={<BibliotecaJuegos />} /> {/* Ruta principal: / */}
          {/* <Route path="agregar" element={<FormularioJuego />} /> */} 
          <Route path="estadisticas" element={<EstadisticasPersonales />} />

          {/* Ruta para capturar errores 404 */}
          <Route path="*" element={<h2>¡404! Navegación fuera del mapa estelar.</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}