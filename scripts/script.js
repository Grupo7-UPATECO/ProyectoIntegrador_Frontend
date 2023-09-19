window.addEventListener("load", function () {
    traer_servidores();
});

document.getElementById("create-server").addEventListener("click", crear_servidor);
document.getElementById("create-channel").addEventListener("click", crear_canal);

let idServidorSeleccionado = null;

function traer_servidores() {
    const url = "http://127.0.0.1:5000/servidor/";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const dataList = document.getElementById("server-list");
            dataList.innerHTML = "";
            data.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.textContent = item.nombre_servidor;
                listItem.addEventListener("click", function () {
                    // Al hacer clic en el servidor, se guarda su ID en la variable global
                    idServidorSeleccionado = item.id_servidor;
                    const nombreServidor = item.nombre_servidor;
                    traer_canales(idServidorSeleccionado, nombreServidor);
                });
                dataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function traer_canales(idServidor, nombreServidor) {
    const url = `http://127.0.0.1:5000/canal/${idServidor}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const dataList = document.getElementById("channel-list");
            dataList.innerHTML = "";

            const serverNameElement = document.createElement("h2");
            serverNameElement.textContent = `Nombre del Servidor: ${nombreServidor}`;
            dataList.appendChild(serverNameElement);

            if (data.length > 0) {
                data.forEach((item) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = item.nombre_canal;
                    listItem.addEventListener("click", function () {
                        const idCanal = item.id_canal;
                        const nombreCanal = item.nombre_canal;
                        traer_chats(idCanal, nombreCanal);
                    });
                    dataList.appendChild(listItem);
                });
            } else {
                noHayCanales();
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function crear_servidor() {
    const url = "http://127.0.0.1:5000/servidor/";
    const nombreServidor = document.getElementById("server-name").value;
    const idUsuario = obtenerIdUsuario();
    const data = { nombre_servidor: nombreServidor, id_usuario: idUsuario };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById("server-name").value = "";
            traer_servidores();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function crear_canal() {
    // Verifica si se ha seleccionado un servidor antes de crear un canal
    if (idServidorSeleccionado === null) {
        alert("Selecciona un servidor antes de crear un canal.");
        return;
    }

    const url = "http://127.0.0.1:5000/canal/";
    const nombreCanal = document.getElementById("channel-name").value;
    const idServidor = idServidorSeleccionado;
    const data = { nombre_canal: nombreCanal, id_servidor: idServidor };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById("channel-name").value = "";
            traer_canales(idServidor);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// TODO Reemplazar esta función con la lógica adecuada para obtener el ID del usuario actual
function obtenerIdUsuario() {
    return 1; // ID de ejemplo
}
