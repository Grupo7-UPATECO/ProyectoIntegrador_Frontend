let arrayServers = []
var popup_window = document.getElementById("popup")


document.addEventListener("DOMContentLoaded", function(){
    traer_servidores();
    popup_window.style.display = "none"
})

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("pop-win")) {
        mostrarPopup();
    }
    if (event.target.classList.contains("cerrar-popup")) {
        cerrarPopup();
    }
});

function traer_servidores() {
    
    const url = "http://127.0.0.1:5000/servidor";
    console.log(url);
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            arrayServers = data;
            displayServer();
        })
        .catch((error) => {
            console.error(error);
        });
}

function displayServer() {
    const servidoresBox = document.getElementById("servers-cards")
    servidoresBox.innerHTML = "";
    arrayServers.forEach(server =>{
        let divServidor = document.createElement("div");
        let contentServidor =  ` 
        <button class="pop-win">${server.nombre_servidor}</button>
        `
        divServidor.innerHTML = contentServidor;
        servidoresBox.appendChild(divServidor)
        divServidor.setAttribute("id", server.id_servidor)
        divServidor.classList.add("server")

    })
}



function mostrarPopup(){
    popup_window = document.getElementById("popup")
    popup_window.style.display = "flex"
}

function cerrarPopup() {
    popup_window = document.getElementById("popup");
    popup_window.style.display = "none";
}