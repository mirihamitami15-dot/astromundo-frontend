// src/pages/FormularioJuego.jsx (Vista para Agregar/Editar Juegos - FINAL)

import { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import ListaLogros from '../components/ListaLogros'; // Importado para Logros

const API_URL = 'http://localhost:4000/api/juegos'; // Definimos la URL base

export default function FormularioJuego() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  // 2. Estado inicial completo 
  const [formData, setFormData] = useState({ 
    titulo: '',
    plataforma: 'PC',
    estado: 'Pendiente',
    horasJugadas: 0,
  });
  
  // ESTADO CRÍTICO DE CARGA PARA MODO EDICIÓN
  const [loadingEdicion, setLoadingEdicion] = useState(true); 

  const esEdicion = !!id; 
  // Uso de emojis y texto limpio para evitar errores de codificación
  const tituloPagina = esEdicion ? '✍️ Editar Misión' : '📝 Registrar Nueva Misión'; 

  // **Efecto para CARGAR datos si estamos EDITANDO**
  useEffect(() => {
    if (esEdicion) {
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          setFormData(response.data);
          setLoadingEdicion(false); // <--- PARAR CARGA AL TENER DATOS
        })
        .catch(error => {
          console.error('Error al cargar datos del juego:', error);
          alert('Error al cargar la misión para editar.');
          setLoadingEdicion(false); // <--- PARAR CARGA AUNQUE HAYA ERROR
        });
    } else {
      setLoadingEdicion(false); // Si NO es edición (es 'agregar'), el formulario está listo
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

  // ------------------------------------------------
  // --- LÓGICA DE RENDERIZADO CONDICIONAL ---
  // ------------------------------------------------

  // 1. CONDICIÓN DE CARGA: Muestra el spinner/mensaje mientras espera datos en modo edición
  if (esEdicion && loadingEdicion) {
    return (
        <section className="formulario-mision-contenedor">
            <h2>📡 Cargando Misión Estelar para Edición...</h2>
        </section>
    );
  }

  // 2. RENDERIZADO PRINCIPAL: El componente se ejecuta solo cuando 'loadingEdicion' es false
  return (
    <section className="formulario-mision-contenedor">
        {/* Usamos Flexbox para el layout de dos columnas: Formulario y Logros */}
        <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}> 
            
            <div style={{ flex: 1 }}> {/* COLUMNA 1: Formulario */}
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
            </div>
            
            {esEdicion && ( // COLUMNA 2: Logros (Solo aparece en modo Editar)
                <div style={{ flex: 1, paddingTop: '30px' }}>
                    <ListaLogros juegoId={id} /> 
                </div>
            )}
        </div>
    </section>
  );
}