const { response } = require("express");
const { download } = require("express/lib/response");

document.getElementById("form_login").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const data = {
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
    };

    fetch("http://127.0.0.1:5000/inicio_sesion", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
        
            return response.json().then(data => {
                window.location.href = "../plantillas/register.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}




const register = document.getElementById("btn_registrar")
register.addEventListener('click', function (event) {
    event.defaultPrevented();
    register();

});

function register(){
    const url = "http://127.0.0.1:5000/registro";
    const id_usuario = obtenerIdUsuario();
    const nombre_usuario = document.getElementById("nombre_usuario");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");

    const data = {id_usuario:id_usuario, nombre_usuario: nombre_usuario, 
         nombre: nombre, apellido: apellido, email: email, contrasena: contrasena};
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Netword response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById("form-register").value = "";
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });


}