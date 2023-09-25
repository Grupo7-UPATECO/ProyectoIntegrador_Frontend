let arrayServers = []
document.addEventListener("DOMContentLoaded", function(){
    traer_servidores();
})



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
        <div>${server.nombre_servidor}</div>
        `
        divServidor.innerHTML = contentServidor;
        servidoresBox.appendChild(divServidor)
        divServidor.setAttribute("id", server.id_servidor)
        divServidor.classList.add("server")
    })
}