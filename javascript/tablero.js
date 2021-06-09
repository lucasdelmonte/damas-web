var tableroArray = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1,0],
    [0,0,0,0,0,1,0,1],
    [0,0,0,0,2,0,0,0],
    [0,2,0,1,0,2,0,2],
    [2,0,0,0,0,0,0,0],
    [0,2,0,0,0,2,0,2],
    [2,0,2,0,2,0,0,0]
];

/* <---------------Comienza la parte del TABLERO---------------> */

var tablero = document.getElementById('board'), cont = 0;

for (var i = 0; i < tableroArray.length; i++) {

        var nuevoDivFila = document.createElement('div');

        nuevoDivFila.className = 'fila fila-' + i;
        tablero.appendChild(nuevoDivFila);

        cont = i % 2;
        for (var j = 0; j < tableroArray[i].length; j++) {
            var nuevoDiv = document.createElement('div');
            if (cont === 0) {
                nuevoDiv.className = 'item_white';
                cont++;
            }else{
                nuevoDiv.className = 'item_black';
                cont--;
            }
            nuevoDiv.id = 'fila-' + j + '-columna-' + i;
            nuevoDivFila.appendChild(nuevoDiv);
        }
}

/* <---------------Comienza la parte de las DAMAS---------------> */

for (var i = 0; i < tableroArray.length; i++) {  

    for (var v = 0; v < tableroArray[i].length; v++) { 

        if (tableroArray[i][v] === 1) {            
            var damaBlanca = document.createElement('img');
            damaBlanca.src = 'img/ficha_blanca.png';
            damaBlanca.alt = 'ficha_blanca';       
            document.getElementById('fila-' + i +'-columna-' + v).appendChild(damaBlanca);
            /* <-----------Comienzan las pruebas-----------> */
            /* <-----------Finalizan las pruebas-----------> */
        }else{
            if (tableroArray[i][v] === 2) {
                var damaRoja = document.createElement('img');
                damaRoja.src = 'img/ficha_roja.png';
                damaRoja.alt = 'ficha_roja';       
                document.getElementById('fila-' + i +'-columna-' + v).appendChild(damaRoja); 
                /* <-----------Comienzan las pruebas-----------> */
                /* <-----------Finalizan las pruebas-----------> */
            }
        }
    }
}

/* <---------------Comienza la parte de los JUGADORES---------------> */

document.getElementById('jugador1').innerHTML = prompt('Ingrese el nombre del primero jugador:');
document.getElementById('jugador2').innerHTML = prompt('Ingrese el nombre del segundo jugador:');

/* <---------------Comienza la parte del CONTADOR---------------> */

document.getElementById('jugador1_puntos').innerHTML = 1;
document.getElementById('jugador2_puntos').innerHTML = 2;

/* <---------------Comienza la parte de los TURNOS---------------> */

var jugador1 = document.getElementById('jugador1'), jugador2 = document.getElementById('jugador2');

/* El turno le corresponde al jugador que tenga el color #33ff33 */
jugador1.style.borderBottom = '4px solid #33ff33';
jugador1.style.borderRadius = '10px';

jugador2.style.borderBottom = '4px solid #c4c4c4';
jugador2.style.borderRadius = '10px';

/* <---------------Comienza la parte de enfocar las DAMAS---------------> */

var fichasBlancas = document.querySelectorAll('img[alt="ficha_blanca"]');

for (var h = 0; h < fichasBlancas.length; h++) {
    const fichaDefinitivaBlanca = fichasBlancas[h];
    fichaDefinitivaBlanca.addEventListener('click', () => {               
        fichaDefinitivaBlanca.style.boxShadow = 'rgb(121, 187, 77) 0px 0px 17px 10px';         
    });
}

var fichasRojas = document.querySelectorAll('img[alt="ficha_roja"]'); 

for (var c = 0; c < fichasRojas.length; c++) { 
    const fichaDefinitivaRoja = fichasRojas[c];
    fichaDefinitivaRoja.addEventListener('click', () => {                  
        fichaDefinitivaRoja.style.boxShadow = 'rgb(250, 78, 78) 0px 0px 17px 10px';         
    });
}

/* <---------------Finaliza la parte de enfocar las DAMAS---------------> */