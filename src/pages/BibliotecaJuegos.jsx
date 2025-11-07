// src/pages/BibliotecaJuegos.jsx (Con datos reales del Backend)

import { useState, useEffect } from 'react';
import axios from 'axios';
import TarjetaJuego from '../components/TarjetaJuego'; 

// URL del Backend (Tu servidor Node.js)
const API_URL = 'http://localhost:4000/api/juegos';

export default function BibliotecaJuegos() {
  // 1. Estado para almacenar los juegos
  const [juegos, setJuegos] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Función para cargar los datos desde el Backend
  const cargarJuegos = async () => {
    try {
      const response = await axios.get(API_URL);
      setJuegos(response.data); // Guarda los juegos en el estado
    } catch (error) {
      console.error('Error al cargar la biblioteca estelar:', error);
    } finally {
      setLoading(false); // Deja de mostrar la carga
    }
  };

  // 2. useEffect se ejecuta una vez al montar el componente
  useEffect(() => {
    cargarJuegos();
  }, []); // Array de dependencias vacío para correr solo al inicio

  if (loading) {
    return <h2>📡 Estableciendo conexión con la base de datos...</h2>;
  }

  return (
    <section className="biblioteca-juegos">
      <h2>🌠 Biblioteca Estelar de Juegos</h2>
      <div className="contenedor-tarjetas">
        {juegos.length === 0 ? (
          <p>Tu biblioteca está vacía. ¡Registra una nueva misión!</p>
        ) : (
          juegos.map(juego => (
            <TarjetaJuego key={juego._id} mision={juego} /> 
            // Nota: Por ahora, usamos el componente sin la función eliminar
          ))
        )}
      </div>
    </section>
  );
}