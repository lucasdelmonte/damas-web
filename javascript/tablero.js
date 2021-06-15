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

var casilla, piezaMovil, piezaMovilSeleccionada;

/* <---------------Comienza la parte del TABLERO---------------> */

var tablero = document.getElementById('board'), cont = 0, x = 0;
for (var i = 0; i < tableroArray.length; i++) {

        var nuevoElementoTr = document.createElement('tr');

        nuevoElementoTr.className = 'fila';
        tablero.appendChild(nuevoElementoTr);

        cont = i % 2;
        for (var j = 0; j < tableroArray.length; j++) {
            var casilla = document.createElement('td');           
            if (cont === 0) {
                casilla.className = 'casilla_blanca';
                cont++;
            }else{
                casilla.className = 'casilla_negra';
                cont--;
            }
            casilla.id = 'fila-' + i + '-columna-' + j;
            nuevoElementoTr.appendChild(casilla);                   
        }

        var casillas = document.querySelectorAll('td'); 
    
        for(var x = 0; x < casillas.length; x++) {
            casillas[x].addEventListener('click', seleccionaPieza);
        }
}

/* <---------------Comienza la parte de las DAMAS---------------> */

for (var i = 0; i < tableroArray.length; i++) {  

    for (var v = 0; v < tableroArray[i].length; v++) { 

        if (tableroArray[i][v] === 1) {            
            var damaBlanca = document.createElement('img');
            damaBlanca.src = 'img/ficha_blanca.png';
            damaBlanca.alt = 'ficha';   
            damaBlanca.className = 'ficha_blanca';    
            document.getElementById('fila-' + i +'-columna-' + v).appendChild(damaBlanca);
        }else{
            if (tableroArray[i][v] === 2) {
                var damaRoja = document.createElement('img');
                damaRoja.src = 'img/ficha_roja.png';
                damaRoja.alt = 'ficha';
                damaRoja.className = 'ficha_roja';       
                document.getElementById('fila-' + i +'-columna-' + v).appendChild(damaRoja); 
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
let turno = 
/* El turno le corresponde al jugador que tenga el color #33ff33 */
jugador1.style.borderBottom = '4px solid #33ff33';
jugador1.style.borderRadius = '10px';

jugador2.style.borderBottom = '4px solid #c4c4c4';
jugador2.style.borderRadius = '10px';

/* <---------------Comienza la parte de enfocar y mover las DAMAS---------------> */

function seleccionaPieza() {
    if(!piezaMovilSeleccionada && this.firstElementChild) {
        casilla = this; 
        piezaMovil = this.innerHTML; 
    // Accedemos a la 'lista de clases' del elemento 'img' y le agregamos 'pintado'
        this.querySelector('img[alt="ficha"]').classList.add('pintado');  
        piezaMovilSeleccionada = true; 
    } else if(piezaMovilSeleccionada){
        casilla.innerHTML= ''; 
        this.innerHTML = piezaMovil; 
        piezaMovilSeleccionada = false; 
    }
}
