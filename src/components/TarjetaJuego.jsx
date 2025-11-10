// src/components/TarjetaJuego.jsx (Card individual de cada juego, con Reseñas)

import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import FormularioReseña from './FormularioReseña'; 
import ListaReseñas from './ListaReseñas'; 

export default function TarjetaJuego({ mision, onDelete }) { 
  const [mostrarReseñas, setMostrarReseñas] = useState(false);
  const [recargarLista, setRecargarLista] = useState(0);

  const handleReseñaAgregada = () => {
      setRecargarLista(prev => prev + 1);
  };
  
  return (
    <div className={`tarjeta-juego ${mision.estado.toLowerCase()}`}>
      
      {/* Información principal del Juego */}
      <div className="portada-nave">
        {/* Aquí iria la portada del juego o una imagen de nave */}
        <span className="estado-mision">Estado: {mision.estado}</span>
      </div>

      
      <div className="info-mision">
        <h3>{mision.titulo}</h3>
        <p>Plataforma: {mision.plataforma}</p>
        <p className="horas-vuelo">Horas de Vuelo: {mision.horasJugadas}</p>
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
        <button 
            className="btn-ver-reseñas"
            onClick={() => setMostrarReseñas(!mostrarReseñas)}
        >
            {mostrarReseñas ? 'Ocultar Reseñas' : 'Ver/Añadir Reseñas'}
        </button>
      </div>

      {mostrarReseñas && (
          <div className="area-reseñas-extendida">
              <ListaReseñas juegoId={mision._id} recargar={recargarLista} />
              <FormularioReseña 
                  juegoId={mision._id} 
                  onReseñaAgregada={handleReseñaAgregada}
              />
          </div>
      )}
    </div>
  );
}