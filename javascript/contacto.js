/* <---------------Comienza la parte del MENU DESPLEGABLE---------------> */

var btnMenu = document.querySelector('img[alt="Menu"]'), desplegado = true;

btnMenu.addEventListener('click', menuDesplegable);

function menuDesplegable() {
    if (desplegado) {
        enlace = document.querySelectorAll('.nav');
    
        for (var i = 0; i < enlace.length; i++) {
            enlace[i].classList.remove('oculto');
            enlace[i].classList.add('mostrado');
        } 

        var nav = document.getElementById('nav').style.height = '316px';

        desplegado = false;
    } else {
        for (var i = 0; i < enlace.length; i++) {
            enlace[i].classList.remove('mostrado');
            enlace[i].classList.add('oculto');
        } 

        var nav = document.getElementById('nav').style.height = '120px';

        desplegado = true;
    }
}

/* <---------------Comienza la parte del FORMULARIO---------------> */

const form = document.getElementById('formulario');
var nombre = document.getElementById('nombre'), email = document.getElementById('email'), comentario = document.getElementById('comentario');

formulario.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie con los datos por defecto
    e.preventDefault();
    // Validamos los campos
    var formatoEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(comentario.value == ' ' || nombre.value.length < 6){
        alert('El nombre completo es demasiado corto o esta incompleto');
    } else {
        if (!formatoEmail.test(email.value)) {
            alert('El email no es valido');
        } else {
            if (comentario.value == ' ' || comentario.value.length < 10) {
                alert('El comentario es demasiado corto o esta incompleto');
            } else {
                // Envitamos el formulario
                sendData(formulario);
                formulario.reset();
            }
        }
    }
})

// Recibe el formulario mediante data
const sendData = (data) => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open('POST', 'https://www.twitch.tv/');
    const formData = new FormData(data);
    xhr.send(formData);
}

/* Debe completar todos los campos correctamente */
