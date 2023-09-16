window.addEventListener("load", function () {
    traer_servidores();
});

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
                dataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}



const crearServidor = document.getElementById("crear_nuevo");

crearServidor.addEventListener("submit", function (event) {
    const url = "http://127.0.0.1:5000/servidor/";
    event.preventDefault();

    const nombreServidor = document.getElementById("nombre_servidor").value;
    const idUsuario = document.getElementById("id_usuario").value;

    const data = {
        id_usuario: idUsuario,
        nombre_servidor: nombreServidor,
    };

    console.log("enviando solicitud POST a:", url);
    console.log("DATOS:", JSON.stringify(data));
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
            traer_servidores();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
