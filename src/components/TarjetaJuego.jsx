// src/components/TarjetaJuego.jsx (Card individual de cada juego)

// Recibe el objeto del juego como 'mision' (prop)
export default function TarjetaJuego({ mision }) { 
  return (
    <div className={`tarjeta-juego ${mision.estado.toLowerCase()}`}>
      <div className="portada-nave">
        {/* Aquí iría la portada del juego o una imagen de nave */}
        <span className="estado-mision">Estado: {mision.estado}</span>
      </div>
      <div className="info-mision">
        <h3>{mision.titulo}</h3>
        <p>Plataforma: {mision.plataforma}</p>
        <p className="horas-vuelo">Horas de Vuelo: {mision.horasJugadas}</p>
        {/* Aquí se mostraría la puntuación de estrellas [cite: 59] */}
      </div>
      <div className="acciones-mision">
        <button className="btn-editar">Editar</button>
        <button className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
}