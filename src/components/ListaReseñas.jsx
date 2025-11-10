// src/components/ListaReseñas.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/reviews';

export default function ListaReseñas({ juegoId, recargar }) {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. NUEVO ESTADO: Filtro por puntuación (0 = Mostrar todo)
  const [filtroPuntuacion, setFiltroPuntuacion] = useState(0); 

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

  // Función auxiliar para renderizar el grupo de estrellas (corregida la codificación)
  const renderEstrellas = (puntuacion) => {
    const estrellasLlenas = '⭐'.repeat(puntuacion); // Estrella llena
    const estrellasVacias = '☆'.repeat(5 - puntuacion); // Estrella vacía (simulada)

    return (
      <span className="puntuacion-lectura">
        <span className="on">{estrellasLlenas}</span>
        <span className="off">{estrellasVacias}</span>
      </span>
    );
  };
  
  // 2. LÓGICA DE FILTRADO
  const reseñasFiltradas = reseñas.filter(res => 
      // Si filtroPuntuacion es 0, mostramos todo. Si no, filtramos por la puntuación exacta.
      filtroPuntuacion === 0 || res.puntuacion === filtroPuntuacion
  );


  if (loading) {
    return <p>Cargando registros...</p>;
  }

  return (
    <div className="lista-reseñas-contenedor">
      {/* 3. BARRA DE FILTRO */}
      <div className="barra-filtro-reseñas">
          <h4>Registros de Bitácora ({reseñasFiltradas.length} de {reseñas.length})</h4>
          
          <select 
              value={filtroPuntuacion} 
              // Convertimos el valor a número antes de guardarlo en el estado
              onChange={(e) => setFiltroPuntuacion(Number(e.target.value))}
              className="select-filtro-mini"
          >
              <option value={0}>Todas las puntuaciones</option>
              <option value={5}>⭐⭐⭐⭐⭐ (5 estrellas)</option>
              <option value={4}>⭐⭐⭐⭐ (4 estrellas)</option>
              <option value={3}>⭐⭐⭐ (3 estrellas)</option>
              <option value={2}>⭐⭐ (2 estrellas)</option>
              <option value={1}>⭐ (1 estrella)</option>
          </select>
      </div>
      
      {reseñasFiltradas.length === 0 ? (
        <p>No hay registros que coincidan con la puntuación seleccionada.</p>
      ) : (
        reseñasFiltradas.map(res => (
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