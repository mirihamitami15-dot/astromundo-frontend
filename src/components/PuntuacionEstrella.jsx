// src/components/PuntuacionEstrella.jsx (Código Corregido)

import { useState } from 'react';

export default function PuntuacionEstrella({ puntuacionInicial, onPuntuacionCambiada }) {
 
  const [rating, setRating] = useState(puntuacionInicial || 0);
  const [hover, setHover] = useState(0);

  const handleSetRating = (index) => {
    setRating(index); 
    onPuntuacionCambiada(index); 
  };

  
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1; 
        return (
          <span
            key={index}
            // Determina si la estrella debe estar 'on' (dorada)
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleSetRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(0)} 
          >
            &#9733; 
          </span>
        );
      })}
    </div>
  );
}