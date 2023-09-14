function loadData() {
    fetch('http://127.0.0.1:5000/servidor/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Manipula los datos y muestra en la página
            var dataList = document.getElementById('data-list');
            
            // Limpia los datos anteriores
            dataList.innerHTML = '';

            // Itera sobre los datos y crea elementos <li> para cada elemento
            data.forEach(item => {
                var listItem = document.createElement('li');
                listItem.textContent = item[1]; // Accede al segundo elemento (en este caso, 'prueba')
                dataList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Llama a la función para cargar datos cuando se cargue la página
loadData();
