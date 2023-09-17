// let selectedServerId = null;

// // Variables para almacenar información simulada de servidores, canales y mensajes
// const servers = [

    
// ];

// const channels = [

    
// ];

// const messages = [
//     { id: 1, channelId: 1, text: "Hola, ¿cómo están?" },
//     { id: 2, channelId: 1, text: "¡Bienvenidos al canal 1!" },
// ];

// // Función para cargar mensajes en la tercera columna
// function loadMessages(channelId) {
//     const messageList = document.getElementById("message-list");
//     messageList.innerHTML = "";
//     const messagesInChannel = messages.filter(message => message.channelId === channelId);
//     messagesInChannel.forEach(message => {
//         const listItem = document.createElement("li");
//         listItem.textContent = message.text;
//         messageList.appendChild(listItem);
//     });
// }

// // Función para crear un nuevo servidor
// function createServer() {
//     const serverName = prompt("Ingrese el nombre del servidor:");
//     if (serverName) {
//         const newServer = { id: servers.length + 1, name: serverName };
//         servers.push(newServer);
//         loadServers();
//     }
// }

// // Función para crear un nuevo canal
// function createChannel() {
//     const channelName = prompt("Ingrese el nombre del canal:");
//     if (channelName) {
//         /* obtener el ID del servidor seleccionado */
//         const serverId = document.querySelector("#server-list li.selected").textContent;
//         const newChannel = { id: channels.length + 1, serverId, name: channelName };
//         channels.push(newChannel);
//         loadChannels(serverId);
//     }
// }

// // Event listeners para los botones
// document.getElementById("create-server").addEventListener("click", createServer);
// document.getElementById("create-channel").addEventListener("click", createChannel);

// // Cargar los servidores iniciales
// loadServers();
