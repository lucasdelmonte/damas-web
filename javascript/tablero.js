var tableroArray = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0]
];

objTablero = {
    tablero: tableroArray
}

var casilla, posicion, piezaMovil, piezaMovilSeleccionada, turno = 1;

/* <---------------Comienza la parte del TABLERO---------------> */

function generarTablero(){
    var tablero = document.getElementById('tablero'), cont = 0;
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
    generarDamas();
    moverPiezas();
}

generarTablero();


/* <---------------Comienza la parte de crear las DAMAS---------------> */

function generarDamas(){
    for (var i = 0; i < tableroArray.length; i++) {  
        for (var v = 0; v < tableroArray[i].length; v++) { 
            if (tableroArray[i][v] === 1) {            
                // Creamos el OBJETO dama blanca 
                var damaBlancaImagen = new Image();
                damaBlancaImagen.src = 'img/ficha_blanca.png';
                damaBlancaImagen.alt = 'ficha_blanca';
                damaBlancaImagen.className = 'fichas';
                id = document.getElementById('fila-' + i +'-columna-' + v);
                var damaBlanca = {
                    src: damaBlancaImagen,
                    alt: 'ficha_blanca',
                    className: 'fichas',
                    classList: 'pintado',
                    id: 'fila-' + i +'-columna-' + v,
                };
                id.appendChild(damaBlanca.src);
            }else{
                if (tableroArray[i][v] === 2) {
                    // Creamos el OBJETO dama roja 
                    var damaRojaImagen = new Image();
                    damaRojaImagen.src = 'img/ficha_roja.png';
                    damaRojaImagen.alt = 'ficha_roja';
                    damaRojaImagen.className = 'fichas';
                    id = document.getElementById('fila-' + i +'-columna-' + v);
                    var damaRoja = {
                        src: damaRojaImagen,
                        alt: 'ficha_roja',
                        className: 'fichas',
                        classList: 'pintado',
                        id: 'fila-' + i +'-columna-' + v
                    };
                    id.appendChild(damaRoja.src);
                }
            }
        }
    }
}

/* function casillaID(){
    tdTablero = document.querySelectorAll('td');
    for (var i = 0; i < tdTablero.length; i++) {
        if (tdTablero[i].className == 'casilla_negra' && tdTablero[i].querySelector('img[alt="ficha_blanca"]')) {
            if (tdTablero[i].firstElementChild.className == 'fichas pintado') {
                casilla = tdTablero[i].id;
                console.log(tdTablero[i]);
                casilla1 = tdTablero[i].id;
            }
        }
    }
} */

/* <---------------Comienza la parte de enfocar y mover las DAMAS, tambien los TURNOS de los jugadores---------------> */

function moverPiezas(){
    var casillas = document.getElementsByClassName('casilla_negra'); 
    
    for(var x = 0; x < casillas.length; x++) {
        casillas[x].addEventListener('click', seleccionaPieza);
    }
}

function seleccionaPieza(e) {
    switch (turno) {
        // Turno del jugador 1
        case 1: 
            if(!piezaMovilSeleccionada && e.currentTarget.firstElementChild) {
                
                casilla = e.currentTarget;
                piezaMovil = e.currentTarget.innerHTML;

                // Estilo a la ficha seleccionada
                e.currentTarget.querySelector('img[alt="ficha_blanca"]').classList.add('pintado');

                // Movimientos posibles
                ubicacion = e.currentTarget.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);
                celda = true; 
                movimientoBlanca(fila, columna);           
                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if (piezaMovilSeleccionada && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget;
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    e.currentTarget.innerHTML = piezaMovil;

                    // Cambio de turnos
                    turno = 2;
                    cambiarTurno(turno);
                    tableroArray[fila][columna] = 0;
                    movimientoBlanca(fila, columna, posicion, movimiento);
                }
            } else if (piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="ficha_blanca"]')){
                posicion = e.currentTarget;
                if (posicion == casilla) {
                    e.currentTarget.querySelector('img[alt="ficha_blanca"]').classList.remove('pintado');
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    e.currentTarget.innerHTML = piezaMovil;
                    movimientoBlanca(fila, columna, posicion, movimiento);
                }
            }
        break;
        
        // Turno del jugador 2
        case 2:
            if(!piezaMovilSeleccionada && e.currentTarget.firstElementChild) {  
                casilla = e.currentTarget; 
                piezaMovil = e.currentTarget.innerHTML; 

                // Estilo a la ficha seleccionada
                e.currentTarget.querySelector('img[alt="ficha_roja"]').classList.add('pintado');

                // Movimientos posibles
                ubicacion = e.currentTarget.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);
                celda = true;
                movimientoRoja(fila, columna);
                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if(piezaMovilSeleccionada && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget; 

                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    e.currentTarget.innerHTML = piezaMovil;

                    // Cambio de turnos
                    turno = 1;
                    cambiarTurno(turno);
                    tableroArray[fila][columna] = 0;
                    movimientoRoja(fila, columna, posicion, movimiento);
                }
            } else if (piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="ficha_roja"]')){
                posicion = e.currentTarget;
                if (posicion == casilla) {
                    e.currentTarget.querySelector('img[alt="ficha_roja"]').classList.remove('pintado');
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    e.currentTarget.innerHTML = piezaMovil;
                    
                    movimientoRoja(fila, columna, posicion, movimiento);
                }
            }
        break;

        default:
        break;
    }
}

function cambiarTurno(turno){
    if (turno == 1) {
        //Quitamos los estilos jugador 2
        jugador2.style.borderBottom = '4px solid #c4c4c4';
        //Agregamos los estilos jugador 1
        jugador1.style.borderBottom = '4px solid #33ff33';
    } else {
        //Quitamos los estilos jugador 1
        jugador1.style.borderBottom = '4px solid #c4c4c4';
        //Agregamos los estilos jugador 2
        jugador2.style.borderBottom = '4px solid #33ff33';
    }
}

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

/* <---------------Comienza la parte de los MOVIMIENTOS VALIDOS---------------> */

function movimientoBlanca(fila, columna, posicion, movimiento){
    if (celda) {
        //Se coloca un efecto en las casillas donde puede mover la dama
        if(columna == 7){ 
            fila++;  
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
            if(!ubicacionFinalUno.firstElementChild){
                ubicacionFinalUno.classList.add('movimiento');
            }
        } else {
            if(columna == 0){
                fila++;
                columna++;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                }
            } else {
                fila++;  
                columna++;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                }
                columna = columna - 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalDos.firstElementChild){
                    ubicacionFinalDos.classList.add('movimiento');
                }
            }
        }
    } else {
        //Se remueve el efecto en las casillas porque ya movio la dama
        fila++;
        columna++;
        if(columna == 1){ 
            ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
            if (posicion.id === movimiento[0].id) {
                tableroArray[fila][columna] = 1;
            }
        } else{
            if (columna == 8) {
                columna = columna - 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                if (posicion.id === movimiento[0].id) {
                    tableroArray[fila][columna] = 1;
                }
            } else {
                columna = columna - 2;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                if (posicion.id === movimiento[0].id) {
                    tableroArray[fila][columna] = 1;
                }
                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                if (posicion.id === movimiento[1].id) {
                    tableroArray[fila][columna] = 1;
                }
            }
        }
    }
}

function movimientoRoja(fila, columna, posicion, movimiento){
    if (celda) {
        //Se coloca un efecto en las casillas donde puede mover la dama
        if(columna == 7){ 
            fila--;  
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
            if(!ubicacionFinalUno.firstElementChild){
                ubicacionFinalUno.classList.add('movimiento');
            }
        } else {
            if(columna == 0){
                fila--;  
                columna++;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                }
            } else {
                fila--;  
                columna--;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                }
                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalDos.firstElementChild){
                    ubicacionFinalDos.classList.add('movimiento');
                }
            }
        }
    } else {
        // Se remueve el efecto en las casillas porque ya movio la dama
        fila--;
        if (columna == 7) {
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento'); 
            // Se actualiza la matriz
            if (posicion.id === movimiento[0].id) {
                tableroArray[fila][columna] = 2;
            }
        } else {
            if (columna == 0) {
                columna++;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento'); 
                if (posicion.id === movimiento[0].id) {
                    tableroArray[fila][columna] = 2;
                }
            } else {
                columna--;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                if (posicion.id === movimiento[0].id) {
                    tableroArray[fila][columna] = 2;
                }
                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                if (posicion.id === movimiento[1].id) {
                    tableroArray[fila][columna] = 2;
                }
            }
        }
    }
}

/* <---------------Comienza la parte de GUARDAR partida---------------> */
// localStorage: Guarda una cadena de texto, clave => valor
// SET => Guardando
// GET => Obtener

btnNuevaPartida = document.getElementById('nueva_partida').addEventListener('click', nuevaPartida);
btnGuardar = document.getElementById('guardar_partida').addEventListener('click', guardarPartida);
btnCargar = document.getElementById('cargar_partida').addEventListener('click', cargarPartida);
btnBorrar = document.getElementById('borrar_partida').addEventListener('click', borrarPartida);

function nuevaPartida(){
    // Sirve para ver la matriz de una mejor manera 
    for (let i = 0; i < objTablero.tablero.length; i++) {
        console.log(objTablero.tablero[i]);
    } 
}

function guardarPartida(){
    localStorage.setItem('partida', JSON.stringify(tableroArray));
    localStorage.setItem('turno', turno);
}

function cargarPartida(){
    // Trae la partida guardada
    tableroArray = JSON.parse(localStorage.getItem('partida'));
    turno = localStorage.getItem('turno');
    debugger;
    console.log(tableroArray);
    // Reinicia el tablero
    tablero.innerHTML = '';
    generarTablero();
    cambiarTurno(turno);
    moverPiezas();
}

function borrarPartida(){
    localStorage.removeItem('partida');
    localStorage.removeItem('turno');
}

/* <---------------Comienza la parte de CARGAR partida---------------> */

/* <---------------Comienza la parte de los nombres para los JUGADORES---------------> */

/* document.getElementById('jugador1').innerHTML = prompt('Ingrese el nombre del primero jugador:');
document.getElementById('jugador2').innerHTML = prompt('Ingrese el nombre del segundo jugador:'); */

/* var puntosJ1 = parseInt(document.getElementById('jugador1_puntos').textContent);
puntosJ1++;
document.getElementById('jugador1_puntos').innerHTML = puntosJ1; */