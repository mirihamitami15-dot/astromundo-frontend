// src/pages/BibliotecaJuegos.jsx (Vista Principal de la Colección)

import TarjetaJuego from '../components/TarjetaJuego';

// Datos simulados (mock) para la visualización inicial
const mockJuegos = [
  { _id: '1', titulo: 'Destino Galáctico', plataforma: 'PC', estado: 'Completado', horasJugadas: 45 },
  { _id: '2', titulo: 'Estación de Exploración Alpha', plataforma: 'PlayStation', estado: 'Jugando', horasJugadas: 12 },
];

export default function BibliotecaJuegos() {
  return (
    <section className="biblioteca-juegos">
      <h2>🌠 Biblioteca Estelar de Juegos</h2>
      <div className="contenedor-tarjetas">
        {mockJuegos.map(juego => (
          <TarjetaJuego key={juego._id} mision={juego} />
        ))}
      </div>
      {/* ... otros elementos de la vista ... */}
    </section>
  );
}