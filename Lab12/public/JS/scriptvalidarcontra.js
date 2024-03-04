const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const mostarPreguntas = document.getElementById('seccion-preguntas');
const buttonPreguntas = document.getElementById('preguntas');
const buttonValidar = document.getElementById('button');
let barraFuerza = document.getElementById('barra-seguridad');

function nivelSeguridad() {
    let fuerza = 0;
    let mayuscula = /[A-Z]+/;
    let minuscula = /[a-z]+/;
    let numero = /[0-9]+/;
    let charact = /[!@#$%^&*()_+\-\=\;':"\|,.<>\/?]+/;        
    if (passwordInput.value.length >= 8) {
        fuerza += 1;
    }
    if (passwordInput.value.match(mayuscula)) {
        fuerza += 1;
    }
    if (passwordInput.value.match(minuscula)) {
        fuerza += 1;
    }
    if (passwordInput.value.match(numero)) {
        fuerza += 1;
    }
    if (passwordInput.value.match(charact)) {
        fuerza += 1;
    }
    

    //Actualizar el estilo de las barras de acuerdo a la fuerza
    if (fuerza === 1) {
        barraFuerza.style.width = '20%';
        barraFuerza.style.backgroundColor = '#f00'; //Rojo
        document.getElementById('nivel-seguridad').innerText = 'Seguridad: Baja';
    } else if (fuerza === 2) {
        barraFuerza.style.width = '40%';
        barraFuerza.style.backgroundColor = '#f00'; //Rojo
        document.getElementById('nivel-seguridad').innerText = 'Seguridad: Baja';
    } else if (fuerza === 3) {
        barraFuerza.style.width = '60%';
        barraFuerza.style.backgroundColor = '#ff0'; //Amarillo
        document.getElementById('nivel-seguridad').innerText = 'Seguridad: Media';
    } else if (fuerza === 4) {
        barraFuerza.style.width = '80%';
        barraFuerza.style.backgroundColor = '#ff0'; //Amarillo
        document.getElementById('nivel-seguridad').innerText = 'Seguridad: Media';
    } else if (fuerza === 5) {
        barraFuerza.style.width = '95%';
        barraFuerza.style.backgroundColor = '#0f0'; //Verde
        document.getElementById('nivel-seguridad').innerText = 'Seguridad: Alta';
    } else {
        barraFuerza.style.width = '0%';
        barraFuerza.style.backgroundColor = '#fff'; //Blanco
        document.getElementById('nivel-seguridad').innerText = '';
    }
}

function validar() {
    if (passwordInput.value === "" || confirmPasswordInput.value === "") {
        alert('Por favor, rellene todos los campos.');
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Las contraseñas no coinciden.');
    } else {
            let widthValue = parseFloat(barraFuerza.style.width);
            if (widthValue < 60) {
                alert('Contraseña no segura.');
            } else {
                alert('Contraseña correcta y segura.');
            }
    }
}

function mostrarPreguntas() {
    mostarPreguntas.hidden = !mostarPreguntas.hidden; //Alternar el estado hidden
}

//Eventos del botón
buttonPreguntas.addEventListener('mouseover', function() {
    if (mostarPreguntas.hidden === false) {
        buttonPreguntas.style.fontFamily = 'Courier New'; //Cambiar la tipografía del botón
        buttonPreguntas.textContent = 'Click para ocultar preguntas'; //Cambiar el texto del botón
    } else {
        buttonPreguntas.style.fontFamily = 'Courier New'; //Cambiar la tipografía del botón
        buttonPreguntas.textContent = 'Click para mostrar preguntas'; //Cambiar el texto del botón
    }
}); 

buttonPreguntas.addEventListener('mouseout', function() {
    buttonPreguntas.style.fontFamily = 'Arial, sans-serif'; //Cambiar la tipografía del botón
    buttonPreguntas.textContent = 'Preguntas'; //Cambiar el texto del botón
});

buttonValidar.addEventListener('mouseover', function() {
    buttonValidar.textContent = 'Validar'; //Cambiar el texto del botón
});

buttonValidar.addEventListener('mouseout', function() {
    buttonValidar.textContent = 'Click validar'; //Cambiar el texto del botón
});