// src/components/FormularioReseña.jsx

import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/reseñas'; 

// Recibe el ID del juego al que pertenece esta reseña
export default function FormularioReseña({ juegoId, onReseñaAgregada }) {
  const [puntuacion, setPuntuacion] = useState(5);
  const [texto, setTexto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el texto no esté vacío y que la puntuación esté entre 1 y 5
    if (!texto.trim() || puntuacion < 1 || puntuacion > 5) {
      alert("Asegúrate de escribir una reseña y dar una puntuación válida (1-5).");
      return;
    }

    try {
      const nuevaReseña = {
        juegoId: juegoId, // ID del juego al que se añade la reseña
        puntuacion: Number(puntuacion),
        texto: texto,
      };

      await axios.post(API_URL, nuevaReseña);

      // Llama a la función de callback para actualizar la lista de reseñas en el padre
      if (onReseñaAgregada) {
          onReseñaAgregada();
      }

      // Limpiar el formulario
      setTexto('');
      setPuntuacion(5);
      alert('Registro de bitácora (reseña) enviado con éxito.');

    } catch (error) {
      console.error('❌ Error al registrar la reseña:', error.response ? error.response.data : error.message);
      alert('Error al registrar la reseña. Verifica el Backend.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-reseña">
      <h4>📝 Dejar un Registro de Bitácora</h4>
      <label>Puntuación Estelar (1-5):</label>
      <input
        type="number"
        value={puntuacion}
        onChange={(e) => setPuntuacion(e.target.value)}
        min="1"
        max="5"
        required
      />
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