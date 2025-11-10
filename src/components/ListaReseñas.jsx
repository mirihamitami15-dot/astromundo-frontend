// src/components/ListaReseñas.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/reviews';

export default function ListaReseñas({ juegoId, recargar }) {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarReseñas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${juegoId}`); 
      setReseñas(response.data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      setReseñas([]);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    cargarReseñas();
  }, [juegoId, recargar]); 

  // Función auxiliar para renderizar el grupo de estrellas
  const renderEstrellas = (puntuacion) => {
    const estrellasLlenas = '⭐'.repeat(puntuacion);
    const estrellasVacias = '☆'.repeat(5 - puntuacion); 

    return (
      <span className="puntuacion-lectura">
        <span className="on">{estrellasLlenas}</span>
        <span className="off">{estrellasVacias}</span>
      </span>
    );
  };

  if (loading) {
    return <p>Cargando registros...</p>;
  }

  return (
    <div className="lista-reseñas-contenedor">
      <h4>Registros de Bitácora ({reseñas.length})</h4>
      {reseñas.length === 0 ? (
        <p>Aún no hay registros de navegación para esta misión.</p>
      ) : (
        reseñas.map(res => (
          <div key={res._id} className="reseña-item">
            <p>
                {/* IMPLEMENTACIÓN DE ESTRELLAS VISUALES */}
                {renderEstrellas(res.puntuacion)}
                ({res.puntuacion}/5)
            </p>
            <p>{res.texto}</p>
            <small>Fecha: {new Date(res.fecha).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}