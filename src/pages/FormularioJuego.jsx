// src/pages/FormularioJuego.jsx (Vista para Agregar/Editar Juegos)

export default function FormularioJuego() {
  const { id } = useParams(); // Obtiene el ID si estamos en /editar/:id
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ /* ... estado inicial ... */ });

  const esEdicion = !!id; // Verdadero si hay un ID en la URL
  const tituloPagina = esEdicion ? '✍️ Editar Misión' : '📝 Registrar Nueva Misión';

  // **Efecto para CARGAR datos si estamos EDITANDO**
  useEffect(() => {
    if (esEdicion) {
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          // Si la carga es exitosa, establece el estado con los datos del juego
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error al cargar datos del juego:', error);
          alert('Error al cargar la misión para editar.');
        });
    }
  }, [id, esEdicion]); // Se ejecuta cuando el ID cambie

  const handleChange = (e) => { /* ... se mantiene igual ... */ };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (esEdicion) {
        // **MODO EDICIÓN (PUT)**
        await axios.put(`${API_URL}/${id}`, formData);
        alert('Misión actualizada con éxito.');
      } else {
        // **MODO CREACIÓN (POST)**
        await axios.post(API_URL, formData);
        alert('Misión registrada con éxito.');
      }

      navigate('/'); // Redirigir a la biblioteca

    } catch (error) {
      console.error('❌ Error en la transacción:', error.response ? error.response.data : error.message);
      alert(`Hubo un error: ${error.response?.data?.message || error.message}`);
    }
  };

  // ... el resto del código (inputs y select, se mantiene igual) ...

  return (
    <section className="formulario-mision">
      <h2>{tituloPagina}</h2> {/* Usa el título dinámico */}
      {/* ... el resto del formulario ... */}
      <button type="submit" className="btn-navegar">
        {esEdicion ? 'Guardar Cambios' : 'Registrar Misión'} {/* Texto dinámico del botón */}
      </button>
    </section>
  );
}