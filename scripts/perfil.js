var usuarioInput, emailInput, nombreInput, apellidoInput, btnCancelar, isEditing
var usuarioElement, emailElement, nombreElement, apellidoElement;


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


document.getElementById('update').addEventListener("click", editar);
function editar() {

    usuarioElement = document.getElementById("nombre_usuario");
    emailElement = document.getElementById("email");
    nombreElement = document.getElementById("nombre");
    apellidoElement = document.getElementById("apellido");

    usuarioInput = document.createElement("input"); //reemplazo los elementos x inputs
    usuarioInput.setAttribute("type", "text");
    usuarioInput.setAttribute("id", "nuevo_usuario");
    usuarioInput.setAttribute("value", usuarioElement.textContent);
    usuarioElement.parentNode.replaceChild(usuarioInput, usuarioElement);

    emailInput = document.createElement("input");
    emailInput.setAttribute("type", "text");
    emailInput.setAttribute("id", "nuevo_email");
    emailInput.setAttribute("value", emailElement.textContent);
    emailElement.parentNode.replaceChild(emailInput, emailElement);

    nombreInput = document.createElement("input");
    nombreInput.setAttribute("type", "text");
    nombreInput.setAttribute("id", "nuevo_nombre");
    nombreInput.setAttribute("value", nombreElement.textContent);
    nombreElement.parentNode.replaceChild(nombreInput, nombreElement);

    apellidoInput = document.createElement("input");
    apellidoInput.setAttribute("type", "text");
    apellidoInput.setAttribute("id", "nuevo_apellido");
    apellidoInput.setAttribute("value", apellidoElement.textContent);
    apellidoElement.parentNode.replaceChild(apellidoInput, apellidoElement);
    // cambio el contenido del boton de "editar" a "guardar"
    document.getElementById("update").textContent = "Guardar cambios";
    document.getElementById("update").addEventListener("click", guardar)

    btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.setAttribute("id", "cancelar");
    btnCancelar.addEventListener("click", cancelar);
    document.body.appendChild(btnCancelar);

    isEditing = true;

}


function cancelar() {

    usuarioInput.parentNode.replaceChild(usuarioElement, usuarioInput); //restaura los elementos a como estaban antes
    emailInput.parentNode.replaceChild(emailElement, emailInput);
    nombreInput.parentNode.replaceChild(nombreElement, nombreInput);
    apellidoInput.parentNode.replaceChild(apellidoElement, apellidoInput);
    document.getElementById("update").textContent = "Editar perfil";
    isEditing = false;
    btnCancelar.parentNode.removeChild(btnCancelar)
}

function guardar() {

    const data = {
        nombre_usuario: document.getElementById('nuevo_usuario').value,
        email: document.getElementById('nuevo_email').value,
        nombre: document.getElementById('nuevo_nombre').value,
        apellido: document.getElementById('nuevo_apellido').value
    }
    console.log(data)

    fetch("http://127.0.0.1:5000/usuario/actualizar_perfil", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {

                return response.json().then(data => {


                    var usuarioElement = document.getElementById("nuevo_usuario");
                    var emailElement = document.getElementById("nuevo_email")
                    var nombreElement = document.getElementById("nuevo_nombre")
                    var apellidoElement = document.getElementById("nuevo_apellido")
            // actualizo con los nuevos valores añadidos
                    usuarioElement.textContent = data.nombre_usuario
                    emailElement.textContent = data.email
                    nombreElement.textContent = data.nombre
                    apellidoElement.textContent = data.apellido

                    usuarioElement.parentNode.replaceChild(usuarioElement, usuarioElement);
                    emailElement.parentNode.replaceChild(emailElement, emailElement);
                    nombreElement.parentNode.replaceChild(nombreElement, nombreElement);
                    apellidoElement.parentNode.replaceChild(apellidoElement, apellidoElement);


                    document.getElementById("update").textContent = "Editar perfil";
                    var cancelBtn = document.getElementById("cancelar");
                    if (cancelBtn) {
                        cancelBtn.parentNode.removeChild(cancelBtn);
                    }
                });
            } else {
                return response.json().then(data => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch(error => {
            document.getElementById("message").innerHTML = "Aocurrio un error.";
        });
}