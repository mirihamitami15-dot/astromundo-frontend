// src/pages/EstadisticasPersonales.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/juegos';

export default function EstadisticasPersonales() {
  const [stats, setStats] = useState({
    totalJuegos: 0,
    juegosCompletados: 0,
    juegosPendientes: 0,
    totalHoras: 0,
    promedioPuntuacion: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const response = await axios.get(API_URL);
        const juegos = response.data;

        // --- CÁLCULO DE MÉTRICAS ---
        const totalJuegos = juegos.length;
        const juegosCompletados = juegos.filter(j => j.estado === 'Completado').length;
        const juegosPendientes = juegos.filter(j => j.estado === 'Pendiente').length;

        const totalHoras = juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0);

        setStats({
          totalJuegos,
          juegosCompletados,
          juegosPendientes,
          totalHoras,
          promedioPuntuacion: Math.random() * (5 - 3) + 3 // Simula un valor entre 3 y 5
        });

      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarEstadisticas();
  }, []);

  if (loading) {
    return <h2 style={{ color: '#6a82fb' }}>📡 Calculando métricas de vuelo...</h2>;
  }

  return (
    <section className="dashboard-estadisticas">
      <h2>📊 Bitácora de Vuelo (Estadísticas)</h2>

      <div className="tarjetas-estadisticas">
        <div className="stat-card">
          <h3>{stats.totalJuegos}</h3>
          <p>Misiones en Catálogo</p>
        </div>

        <div className="stat-card completo">
          <h3>{stats.juegosCompletados}</h3>
          <p>Misiones Completadas</p>
        </div>

        <div className="stat-card horas">
          <h3>{stats.totalHoras.toFixed(1)}</h3>
          <p>Horas de Vuelo Registradas</p>
        </div>

        <div className="stat-card">
          <h3>{stats.promedioPuntuacion.toFixed(2)} / 5.0</h3>
          <p>Puntuación Promedio</p>
        </div>
      </div>

      {/* Aquí podrías añadir un componente de ListaLogros si fuera necesario */}
    </section>
  );
}