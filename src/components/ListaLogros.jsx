// src/components/ListaLogros.jsx (CÓDIGO FINAL CON PORCENTAJE)

import { useState, useEffect } from 'react';
import axios from 'axios';

// URL del Backend para buscar logros
const API_URL = 'http://localhost:4000/api/logros'; 

export default function ListaLogros({ juegoId }) {
    const [logros, setLogros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarLogros = async () => {
            if (!juegoId) return; // No hacer nada si no hay ID de juego
            try {
                // Llamada al endpoint que creaste en el Backend (GET /api/logros/:juegoId)
                const response = await axios.get(`${API_URL}/${juegoId}`); 
                setLogros(response.data);
            } catch (error) {
                console.error('Error al cargar logros:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarLogros();
    }, [juegoId]); // Se ejecuta cuando el ID del juego cambia o se carga

    if (loading) return <p>📡 Buscando registros de logros...</p>;

    return (
        <div className="lista-logros">
            <h3>🏆 Logros de la Misión ({logros.length})</h3>
            {logros.length === 0 ? (
                <p>No hay logros registrados en nuestra base de datos para esta misión.</p>
            ) : (
                logros.map(logro => (
                    <div key={logro._id} className="logro-item">
                        
                        {/* CONTENEDOR FLEX PARA NOMBRE Y PORCENTAJE */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '5px' // Pequeño espacio debajo del encabezado
                        }}>
                            <span className="logro-nombre">{logro.secreto ? '🔒 Logro Oculto' : logro.nombre}</span>
                            
                            {/* MOSTRAR PORCENTAJE */}
                            <span className="logro-porcentaje">
                                {logro.porcentajeJugadores.toFixed(1)}% de jugadores
                            </span>
                        </div>
                        
                        {/* DESCRIPCIÓN */}
                        <p className="logro-desc">{logro.descripcion}</p>
                    </div>
                ))
            )}
        </div>
    );
}