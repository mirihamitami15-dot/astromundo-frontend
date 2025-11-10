// src/pages/BibliotecaJuegos.jsx 

import { useState, useEffect } from 'react';
import axios from 'axios';
import TarjetaJuego from '../components/TarjetaJuego'; 

const API_URL = 'http://localhost:4000/api/juegos';

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Nuevos estados para la búsqueda y filtro
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState(''); 

  const cargarJuegos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setJuegos(response.data); 
    } catch (error) {
      console.error('Error al cargar la biblioteca estelar:', error);
      setJuegos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const eliminarJuego = async (id) => {
      // ... (código DELETE se mantiene igual) ...
      try {
        await axios.delete(`${API_URL}/${id}`); 
        setJuegos(prevJuegos => prevJuegos.filter(j => j._id !== id));
        alert('Misión eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la misión:', error);
      }
  };

  // Lógica de Filtrado en el Frontend
  const juegosFiltrados = juegos.filter(juego => {
      // Filtro por búsqueda (título)
      const coincideBusqueda = juego.titulo.toLowerCase().includes(busqueda.toLowerCase());

      // Filtro por estado
      const coincideEstado = filtroEstado === '' || juego.estado === filtroEstado;

      return coincideBusqueda && coincideEstado;
  });


  if (loading) {
    return <h2>📡 Estableciendo conexión con la base de datos...</h2>;
  }

  return (
    <section className="biblioteca-juegos">
      <h2>🌠 Biblioteca Estelar de Juegos</h2>

      {/* BARRA DE FILTROS Y BÚSQUEDA (MODIFICADA CON ICONO) */}
      <div className="barra-filtros">
          {/* Contenedor Flex para el Icono y el Input */}
          <div className="contenedor-busqueda-icono">
              <span className="icono-busqueda">🔍</span> 
              <input
                  type="text"
                  placeholder="Buscar misión o juego en el catálogo..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="input-busqueda"
              />
          </div>
          
          {/* Selector de Filtro de Estado */}
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="select-filtro">
              <option value="">Filtrar por Estado...</option>
              <option value="Jugando">Jugando</option>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Abandonado">Abandonado</option>
          </select>
      </div>

      <div className="contenedor-tarjetas">
        {juegosFiltrados.length === 0 ? (
          <p>No hay misiones que coincidan con los criterios de búsqueda.</p>
        ) : (
          juegosFiltrados.map(juego => (
            <TarjetaJuego key={juego._id} mision={juego} onDelete={eliminarJuego} /> 
          ))
        )}
      </div>
    </section>
  );
}