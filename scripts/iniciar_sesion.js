/* function login() {
    const data = {
    nombre_usuario: document.getElementById("nombre_usuario").value,
    contrasena: document.getElementById("contrasena").value,
    };
    fetch("http://127.0.0.1:5000/usuario/inicio_sesion", {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include'
    })
    .then(response => {
    if (response.status === 200) {
    return response.json().then(data => {
    window.location.href = "perfil.html";
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

   document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
   }); */