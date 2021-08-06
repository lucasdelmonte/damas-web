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

var nombre = document.getElementById('nombre'), email = document.getElementById('email'), mensaje = document.getElementById('mensaje');

// De Delmonte Lucas 
const formulario = document.querySelector('#formulario');
// Enlace 
const btnMailA = document.querySelector('#fundamental');

formulario.addEventListener('submit', enviarEmail);

function enviarEmail(event){
    event.preventDefault();
    // Validamos los campos
    var formatoEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var alfanumericos = /[A-Za-z0-9]+ [A-Za-z0-9]/;

    if(nombre.value == ' ' || nombre.value.length < 6 || !alfanumericos.test(nombre.value)){
        alert('El nombre completo es demasiado corto,  esta incompleto o contiene caracteres no validos');
    } else {
        if (!formatoEmail.test(email.value)) {
            alert('El email no es valido');
        } else {
            if (mensaje.value == ' ' || mensaje.value.length < 6) {
                alert('El mensaje es demasiado corto o esta incompleto');
            } else {
                // Obtenemos la informacion del formulario
                const form = new FormData(this);
                // Le mandamos la informacion
                btnMailA.setAttribute('href', `mailto:delmontelucas678@gmail.com?subject=Nombre: ${form.get('nombre')}  Correo: ${form.get('email')}&body=${form.get('mensaje')}`);
                // Click al elemento btnMailA oculto en la pagina
                btnMailA.click();
                // Reseteamos el formulario
                document.getElementById("formulario").reset();
            }
        }
    }
}


/* NOTA: Este codigo comentado es el utilizado anteriormente para una entrega durante la cursada. */
/* formulario.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envie con los datos por defecto
    e.preventDefault();
    // Validamos los campos
    var formatoEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(nombre.value == ' ' || nombre.value.length < 6){
        alert('El nombre completo es demasiado corto o esta incompleto');
    } else {
        if (!formatoEmail.test(email.value)) {
            alert('El email no es valido');
        } else {
            if (mensaje.value == ' ' || mensaje.value.length < 10) {
                alert('El mensaje es demasiado corto o esta incompleto');
            } else {
                // Enviamos el formulario
                sendData(formulario);
                formulario.reset();
            }
        }
    }
}) */

// Recibe el formulario mediante data
/* const sendData = (data) => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open('POST', 'https://www.twitch.tv/');
    const formData = new FormData(data);
    xhr.send(formData);
} */
