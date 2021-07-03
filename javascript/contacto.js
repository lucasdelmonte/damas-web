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

