// src/pages/FormularioJuego.jsx (Vista para Agregar/Editar Juegos)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormularioJuego() {
  // Estado inicial para el formulario
  const [formData, setFormData] = useState({
    titulo: '',
    plataforma: 'PC', // Valor por defecto
    estado: 'Pendiente', // Valor por defecto
    horasJugadas: 0,
  });

  const navigate = useNavigate(); // Hook para redirigir después de guardar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // **Aquí irá la función para conectar con Axios y el Backend**
    console.log('Datos listos para enviar:', formData);

    // Simular redirección
    // navigate('/'); 
  };

  return (
    <section className="formulario-mision">
      <h2>📝 Registrar Nueva Misión</h2>
      <form onSubmit={handleSubmit} className="form-nave">

        <label>Título de la Misión (Juego):</label>
        <input 
          type="text" 
          name="titulo" 
          value={formData.titulo} 
          onChange={handleChange} 
          required
        />

        <label>Plataforma de Despegue:</label>
        <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo">Nintendo</option>
          <option value="Móvil">Móvil</option>
          <option value="Otro">Otro</option>
        </select>

        <label>Estado de la Misión:</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="Pendiente">Pendiente</option>
          <option value="Jugando">Jugando</option>
          <option value="Completado">Completado</option>
          <option value="Abandonado">Abandonado</option>
        </select>

        <label>Horas de Vuelo (Jugadas):</label>
        <input 
          type="number" 
          name="horasJugadas" 
          value={formData.horasJugadas} 
          onChange={handleChange} 
          min="0"
        />

        <button type="submit" className="btn-navegar">Registrar Misión</button>
      </form>
    </section>
  );
}