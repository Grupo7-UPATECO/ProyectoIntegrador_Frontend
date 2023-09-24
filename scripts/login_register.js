function login() {
    const data = {
        nombre_usuario: document.getElementById("nombre_usuario").value,
        contrasena: document.getElementById("contrasena").value,
    };
    fetch("http://127.0.0.1:5000/usuario/inicio_sesion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json().then((data) => {
                    window.location.href = "perfil.html";
                });
            } else {
                return response.json().then((data) => {
                    document.getElementById("message").innerHTML = data.message;
                });
            }
        })
        .catch((error) => {
            document.getElementById("message").innerHTML = "Ocurrió un error.";
        });
}

function register() {
    const url = "http://127.0.0.1:5000/usuario/registro";
    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    const data = {
        nombre_usuario: nombre_usuario,
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasena: contrasena,
    };

    console.log(data);

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Limpia los campos del formulario después de un registro exitoso
            /*         document.getElementById("nombre_usuario").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        document.getElementById("contrasena").value = ""; */
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
