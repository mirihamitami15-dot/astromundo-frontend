// src/components/TarjetaJuego.jsx (Card individual de cada juego)

import { Link } from 'react-router-dom';

// 1. Recibe las props mision Y onDelete
export default function TarjetaJuego({ mision, onDelete }) { 
  return (
    // Se mantiene la estructura y la clase dinámica
    <div className={`tarjeta-juego ${mision.estado.toLowerCase()}`}>
      
      
      <div className="portada-nave">
        {/* Aquí iria la portada del juego o una imagen de nave */}
        <span className="estado-mision">Estado: {mision.estado}</span>
      </div>

      
      <div className="info-mision">
        <h3>{mision.titulo}</h3>
        <p>Plataforma: {mision.plataforma}</p>
        <p className="horas-vuelo">Horas de Vuelo: {mision.horasJugadas}</p>
        [cite_start]{/* Aquí se mostraría la puntuación de estrellas [cite: 59] */}
      </div>

      
      <div className="acciones-mision">
    
    <Link 
        to={`/editar/${mision._id}`} 
        className="btn-editar"
    >
        Editar
    </Link>
    
    <button 
      className="btn-eliminar"
      onClick={() => onDelete(mision._id)} 
    >
      Eliminar
    </button>
  </div>
    </div>
  );
}