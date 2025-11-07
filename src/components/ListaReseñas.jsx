// src/components/ListaReseñas.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/reseñas'; 

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
  }, [juegoId, recargar]); // Se recarga cuando el juegoId o la bandera 'recargar' cambian

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
            <p>⭐ Puntuación: {res.puntuacion}/5</p>
            <p>{res.texto}</p>
            <small>Fecha: {new Date(res.fecha).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}