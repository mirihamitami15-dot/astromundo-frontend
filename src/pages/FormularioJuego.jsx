// src/pages/FormularioJuego.jsx (Vista para Agregar/Editar Juegos)

// 1. IMPORTACIONES NECESARIAS: ¡Esto es lo que faltaba!
import { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/juegos'; // Definimos la URL base

export default function FormularioJuego() {
  const { id } = useParams(); // Obtiene el ID si estamos en /editar/:id
  const navigate = useNavigate(); 
  
  // 2. Estado inicial completo (debe estar en el cuerpo de la función)
  const [formData, setFormData] = useState({ 
    titulo: '',
    plataforma: 'PC',
    estado: 'Pendiente',
    horasJugadas: 0,
  });

  const esEdicion = !!id; 
  const tituloPagina = esEdicion ? '✍️ Editar Misión' : '📝 Registrar Nueva Misión';

  // **Efecto para CARGAR datos si estamos EDITANDO**
  useEffect(() => {
    if (esEdicion) {
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error al cargar datos del juego:', error);
          alert('Error al cargar la misión para editar.');
        });
    }
  }, [id, esEdicion]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Manejo especial para números
    const finalValue = name === 'horasJugadas' ? Number(value) : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (esEdicion) {
        // MODO EDICIÓN (PUT)
        await axios.put(`${API_URL}/${id}`, formData);
        alert('Misión actualizada con éxito.');
      } else {
        // MODO CREACIÓN (POST)
        await axios.post(API_URL, formData);
        alert('Misión registrada con éxito.');
      }

      navigate('/'); // Redirigir a la biblioteca

    } catch (error) {
      console.error('❌ Error en la transacción:', error.response ? error.response.data : error.message);
      alert(`Hubo un error: ${error.response?.data?.message || error.message}`);
    }
  };

  // 3. RENDERIZADO DEL FORMULARIO COMPLETO: ¡Esto también faltaba!
  return (
    <section className="formulario-mision">
      <h2>{tituloPagina}</h2>
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
        
        <button type="submit" className="btn-navegar">
          {esEdicion ? 'Guardar Cambios' : 'Registrar Misión'}
        </button>
      </form>
    </section>
  );
}