const form = document.getElementById("form-register");
const submitButton = document.getElementById("btn-registrar");

let timeout = null;
let errors = {
    nombre_usuario: true,
    nombre: true,
    apellido: true,
    email: true,
    contrasena: true,
};

const mailformatRegex = /^\w+([\.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

document.querySelectorAll(".form-register input").forEach((box) => {
    const boxInput = box.querySelector('input');

    boxInput.addEventListener('keydown', (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() =>{
            console.log('Input ${boxInput.name} value', boxInput.value);

            validation(box, boxInput);
        }, 300);
    });
});

validation = (box, boxInput) => {
    if (boxInput.value == '') {
        showError(true, box, boxInput);
    } else{
        showError(false, box, boxInput);
    }
    
    if (boxInput.name == 'email') {
        if (!boxInput.value.match(mailformatRegex)) {
            showError(true, box, boxInput);
        } else {
            showError(false, box, boxInput);
        }
    }
    if (boxInput.name == 'contrasena') {
        if (boxInput.value.length <=3) {
            showError(true, box, boxInput);
        } else {
            showError(false, box, boxInput);

        }
    }
    submitController();
};

showError = (check, box, boxInput) => {
    if (check) {
        box.classList.remove('warnings');
        box.classList.add('warnings');
        errors[boxInput.name] = true;
    } else {
        box.classList.remove('warnings');
        box.classList.add('warnings');
        errors[boxInput.name = false];
    }
}

submitController = () => {
    console.log(errors);
    if (errors.nombre_usuario ||errors.nombre ||errors.apellido || errors.email || errors.contrasena) {
        submitButton.toggleAttribute('disabled', true);
    } else {
        submitButton.toggleAttribute('disabled', false);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const forData = new FormData(event.target);
    console.log([...forData]);
    for (let [key, value] of forData.entries()) {
        console.log('${key}: ${value}');
    }
});


const nombre_usuario = document.getElementById("nombre_usuario");
const contrasena = document.getElementById("contrasena");

const btn = document.getElementById("btn_login");
const fields = querySelectorAll("validate")

btn.addEventListener("onclick", function(event) {
    event.preventDefault();
    fields.forEach(function(field) {
        if (field.value =="") {
            field.classList.add("errorField")
        }
    })
})
fields.forEach(function(field) {
    nombre_usuario.addEventListener("keyup", function() {
        nombre_usuario.classList.remove("errorField")
    })

})
