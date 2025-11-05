// src/App.jsx

import BibliotecaJuegos from './pages/BibliotecaJuegos';
import './styles/Global.css'; // Lo crearemos en el próximo paso

export default function App() {
  return (
    <div className="app-container">
      <header className="nave-header">
        <h1>GameTracker: Misión Espacial 🪐</h1>
      </header>
      <main>
        <BibliotecaJuegos /> 
        {/* Aquí se manejará el enrutamiento más adelante */}
      </main>
    </div>
  );
}
