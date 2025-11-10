// src/components/FormularioReseña.jsx (Código Final y Corregido)

import { useState } from 'react';
import axios from 'axios';
import PuntuacionEstrella from './PuntuacionEstrella';

const API_URL = 'http://localhost:4000/api/reviews';

// Recibe el ID del juego al que pertenece esta reseña
export default function FormularioReseña({ juegoId, onReseñaAgregada }) {
  const [puntuacion, setPuntuacion] = useState(5);
  const [texto, setTexto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. VALIDACIÓN CRÍTICA: Asegurarse de que el juegoId exista y sea un ID válido
    if (!juegoId) {
      alert("Error: El ID del juego (Misión) no fue encontrado. Intenta recargar la biblioteca.");
      console.error("No se pudo enviar la reseña porque juegoId es nulo o indefinido.");
      return;
    }
    
    // Validar campos requeridos
    if (!texto.trim() || puntuacion < 1 || puntuacion > 5) {
      alert("Asegúrate de escribir una reseña y dar una puntuación válida (1-5).");
      return;
    }

    try {
      const nuevaReseña = {
       juegoId: juegoId,
       puntuacion: Number(puntuacion), 
       texto: texto,
    };

      // 2. Envío de la petición POST
      await axios.post(API_URL, nuevaReseña);

      // Éxito
      if (onReseñaAgregada) {
          onReseñaAgregada();
      }

      // Limpiar el formulario
      setTexto('');
      setPuntuacion(5);
      alert('Registro de bitácora (reseña) enviado con éxito.');

    } catch (error) {
      // 3. Muestra el error más detallado que el Backend puede enviar
      const backendError = error.response?.data?.message || error.message;
      console.error('❌ Error al registrar la reseña:', backendError);
      alert('Error al registrar la reseña. Verifica el Backend. Detalle: ' + backendError);
    }
  };

 return (
    <form onSubmit={handleSubmit} className="form-reseña">
      <h4>📝 Dejar un Registro de Bitácora</h4>
      
      {/* 1. REEMPLAZO DEL INPUT DE PUNTUACIÓN */}
      <div>
        <label>Puntuación Estelar (1-5):</label>
        {/* Aquí usas el componente y pasas setPuntuacion para que guarde el valor */}
        <PuntuacionEstrella 
            puntuacionInicial={puntuacion}
            onPuntuacionCambiada={setPuntuacion} // <-- ESTO CONECTA LA SELECCIÓN
        />
      </div>
      
      {/* Reseña Detallada se mantiene igual */}
      <label>Reseña Detallada:</label>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows="4"
        required
        placeholder="Comparte tu experiencia de vuelo..."
      />
      
      <button type="submit" className="btn-navegar-secundario">Enviar Reseña</button>
    </form>
  );
}