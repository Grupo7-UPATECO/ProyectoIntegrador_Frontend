window.addEventListener("load", function () {
    traer_servidores();
});
document.getElementById("create-server").addEventListener("click", crear_servidor);

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
                    const idServidor = item.id_servidor;
                    const nombreServidor = item.nombre_servidor; // Obtener el nombre del servidor
                    traer_canales(idServidor, nombreServidor); // Pasar el nombre del servidor como argumento
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

            // Crear un elemento para mostrar el nombre del servidor
            const serverNameElement = document.createElement("h2");
            serverNameElement.textContent = `Nombre del Servidor: ${nombreServidor}`;
            dataList.appendChild(serverNameElement);

            if (data.length > 0) {
                // Mostrar canales de este servidor
                data.forEach((item) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = item.nombre_canal;

                    // Agregar evento click para mostrar los chats del canal
                    listItem.addEventListener("click", function () {
                        const idCanal = item.id_canal;
                        const nombreCanal = item.nombre_canal; // Obtener el nombre del canal
                        traer_chats(idCanal, nombreCanal); // Pasar el nombre del canal como argumento
                    });

                    dataList.appendChild(listItem);
                });
            } else {
                // Mostrar mensaje de no canales
                noHayCanales();
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function traer_chats(idCanal, nombreCanal) {
    const url = `http://127.0.0.1:5000/chat/${idCanal}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const dataList = document.getElementById("chat-list");
            dataList.innerHTML = "";

            // Crear un elemento para mostrar el nombre del canal
            const channelNameElement = document.createElement("h2");
            channelNameElement.textContent = `Nombre del Canal: ${nombreCanal}`;

            dataList.appendChild(channelNameElement);

            if (data.length > 0) {
                // Mostrar chats de este canal
                data.forEach((item) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = item.chat;
                    dataList.appendChild(listItem);
                });
            } else {
                // Mostrar mensaje de no chats
                noHayChats();
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function crear_servidor() {
    const url = "http://127.0.0.1:5000/servidor/";
    const nombreServidor = document.getElementById("server-name").value;
    //TODO 
    const idUsuario = 1; // reemplazar 1 por el id del usuario actual obtenerIdUsuario()
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
            // Limpia el campo de entrada de nombre del servidor
            document.getElementById("server-name").value = "";
            // Actualizar la lista de servidores
            traer_servidores();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}



