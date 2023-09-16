const idServidor = 1; 

// Obtener canales de la API
obtenerCanales()
  .then(canales => {

    // Filtrar solo canales del servidor seleccionado 
    const canalesServidor = canales.filter(c => c.id_servidor == idServidor);
    
    if(canalesServidor.length > 0) {
      // Mostrar canales de este servidor
      pintarCanales(canalesServidor); 
    } else {
      // Mostrar mensaje de no canales  
      noHayCanales();
    }

  });

// Función para obtener canales de la API
async function obtenerCanales() {
    const res = await fetch('/canales');
    return res.json();
  }