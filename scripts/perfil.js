function getProfile() {
    const url = "http://127.0.0.1:5000/usuario/perfil";
    
    fetch(url, {
    method: 'GET',
    credentials: 'include'
    })
    .then(response => {
    if (response.status === 200) {
    return response.json().then(data => {
    document.getElementById("nombre_usuario").innerText = data.
    nombre_usuario;
    document.getElementById("email").innerText = data.email;
    document.getElementById("nombre").innerText = data.nombre;
    document.getElementById("apellido").innerText = data.apellido;
    });
    } else {
    return response.json().then(data => {
    document.getElementById("message").innerHTML = data.message;
    });
    }
    })
    .catch(error => {
    document.getElementById("message").innerHTML = "Ocurrió un error.";
    });
   }

window.addEventListener('load', function (event) {
    event.preventDefault();
    getProfile()
})