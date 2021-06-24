var tableroArray = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,0,0],
    [0,0,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,0,0],
    [0,0,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0]
];

var casilla, piezaMovil, piezaMovilSeleccionada, turno = 1, posicion;

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
}




/* <---------------Comienza la parte de crear las DAMAS---------------> */

for (var i = 0; i < tableroArray.length; i++) {  

    for (var v = 0; v < tableroArray[i].length; v++) { 

        if (tableroArray[i][v] === 1) {            
            var damaBlanca = document.createElement('img');
            damaBlanca.src = 'img/ficha_blanca.png';
            damaBlanca.alt = 'ficha_blanca';
            damaBlanca.className = 'fichas';   
            document.getElementById('fila-' + i +'-columna-' + v).appendChild(damaBlanca);
        }else{
            if (tableroArray[i][v] === 2) {
                var damaRoja = document.createElement('img');
                damaRoja.src = 'img/ficha_roja.png';
                damaRoja.alt = 'ficha_roja';
                damaRoja.className = 'fichas';
                document.getElementById('fila-' + i +'-columna-' + v).appendChild(damaRoja); 
            }
        }
    }
}

/* <---------------Comienza la parte de enfocar y mover las DAMAS, tambien los TURNOS de los jugadores---------------> */

function seleccionaPieza() {
    switch (turno) {
        //Turno del jugador 1
        case 1: 
            if(!piezaMovilSeleccionada && this.firstElementChild) {   
                casilla = this; 
                piezaMovil = this.innerHTML;
                this.querySelector('img[alt="ficha_blanca"]').classList.add('pintado');

                //Movimientos posibles
                ubicacion = this.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);
                celda = true;
                movimientoBlanca(fila, columna);
                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if (piezaMovilSeleccionada){
                posicion = this; 
                if(posicion != casilla && posicion.id === movimiento[0].id && !this.firstElementChild || posicion.id === movimiento[1].id && !this.firstElementChild){
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    this.innerHTML = piezaMovil;

                    turno = 2;
                    //Quitamos los estilos jugador 1
                    jugador1.style.borderBottom = '4px solid #c4c4c4';
                    //Agregamos los estilos jugador 2
                    jugador2.style.borderBottom = '4px solid #33ff33';

                    movimientoBlanca(fila, columna);
                }
            }
        break;
        
        //Turno del jugador 2
        case 2:
            if(!piezaMovilSeleccionada && this.firstElementChild) {   
                casilla = this; 
                piezaMovil = this.innerHTML; 
                this.querySelector('img[alt="ficha_roja"]').classList.add('pintado');

                //Movimientos posibles
                ubicacion = this.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);
                celda = true;
                movimientoRoja(fila, columna);

                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if(piezaMovilSeleccionada){
                posicion = this; 
                if(posicion != casilla && posicion.id === movimiento[0].id && !this.firstElementChild || posicion.id === movimiento[1].id && !this.firstElementChild){
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    this.innerHTML = piezaMovil;

                    turno = 1;
                    //Quitamos los estilos jugador 2
                    jugador2.style.borderBottom = '4px solid #c4c4c4';
                    //Agregamos los estilos jugador 1
                    jugador1.style.borderBottom = '4px solid #33ff33';

                    movimientoRoja(fila, columna);
                }
            }
        break;

        default:
        break;
    }
}

var casillas = document.getElementsByClassName('casilla_negra'); 

for(var x = 0; x < casillas.length; x++) {
    casillas[x].addEventListener('click', seleccionaPieza);
}

/* <---------------Comienza la parte de los nombres para los JUGADORES---------------> */

document.getElementById('jugador1').innerHTML = prompt('Ingrese el nombre del primero jugador:');
document.getElementById('jugador2').innerHTML = prompt('Ingrese el nombre del segundo jugador:');

/* <---------------Comienza la parte del MENU DESPLEGABLE---------------> */

var $btnMenu = document.querySelector('img[alt="Menu"]'), desplegado = true;

$btnMenu.addEventListener('click', menuDesplegable);

function menuDesplegable() {
    if (desplegado) {
        $enlace = document.querySelectorAll('.nav');
    
        for (var i = 0; i < $enlace.length; i++) {
            $enlace[i].classList.remove('oculto');
            $enlace[i].classList.add('mostrado');
        } 

        var $nav = document.getElementById('nav').style.height = '268px';

        desplegado = false;
    } else {
        for (var i = 0; i < $enlace.length; i++) {
            $enlace[i].classList.remove('mostrado');
            $enlace[i].classList.add('oculto');
        } 

        var $nav = document.getElementById('nav').style.height = '120px';

        desplegado = true;
    }
}

/* <---------------Comienza la parte de los MOVIMIENTOS VALIDOS---------------> */

function movimientoBlanca(fila, columna){
    if (celda) {
        //Se coloca un efecto en las casillas donde puede mover la dama
        if(columna == 7){ 
            fila++;  
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
            ubicacionFinalUno.classList.add('movimiento');
        } else {
            if(columna == 0){
                fila++;
                columna++;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                ubicacionFinalUno.classList.add('movimiento');
            } else {
                fila++;  
                columna++;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                ubicacionFinalUno.classList.add('movimiento');
                
                columna = columna - 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna );
                ubicacionFinalDos.classList.add('movimiento');
            }
        }
    } else {
        //Se remueve el efecto en las casillas porque ya movio la dama
        fila++;
        columna++;
        if(columna != 8){ 
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
        }
        columna = columna - 2;
        ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
    }
}

function movimientoRoja(fila, columna){
    if (celda) {
        //Se coloca un efecto en las casillas donde puede mover la dama
        if(columna == 7){ 
            fila--;  
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
            ubicacionFinalUno.classList.add('movimiento');
        } else {
            if(columna == 0){
                fila--;  
                columna++;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                ubicacionFinalUno.classList.add('movimiento');
            } else {
                fila--;  
                columna--;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                ubicacionFinalUno.classList.add('movimiento');
                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna );
                ubicacionFinalDos.classList.add('movimiento');
            }
        }
    } else {
        //Se remueve el efecto en las casillas porque ya movio la dama
        fila--;
        if (columna == 0) {
            columna++;
        } else {
            if (columna == 8) {
                columna--;
            } else {
                columna--;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');

                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
            }
        }
        ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento'); 
    }
}
