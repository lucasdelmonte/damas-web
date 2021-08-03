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

var casilla, posicion, piezaMovil, piezaMovilSeleccionada, turno = 1, comer = false, comerUno = false, comerDos = false;

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
nombreJugadores();


/* <---------------Comienza la parte de CREAR las damas---------------> */

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

/* <---------------Comienza la parte de ENFOCAR y MOVER las damas, tambien los TURNOS de los jugadores---------------> */

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
                verificarUbicacionBlanca(ubicacion);
                movimiento = document.querySelectorAll('.movimiento');
                
                piezaMovilSeleccionada = true;
            } else if (piezaMovilSeleccionada && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget;
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    tableroArray[fila][columna] = 0;
                    e.currentTarget.innerHTML = piezaMovil;

                    nuevafilaColumna = e.currentTarget;
                    actualizarMatriz(nuevafilaColumna);
                    tableroArray[nuevaFila][nuevaColumna] = 1;

                    // Cambio de turnos
                    turno = 2;
                    cambiarTurno(turno);

                    movimientoBlanca(fila, columna);
                }
            } else if (piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="ficha_blanca"]')){
                posicion = e.currentTarget;
                if (posicion == casilla) {
                    // Quitamos estilos porque volvio a seleccionar la misma dama
                    e.currentTarget.querySelector('img[alt="ficha_blanca"]').classList.remove('pintado');
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    e.currentTarget.innerHTML = piezaMovil;
                    movimientoBlanca(fila, columna);
                }
            }
        break;
        
        // Turno del jugador 2
        case 2:
            if(!piezaMovilSeleccionada && e.currentTarget.firstElementChild) {  
                casilla = e.currentTarget; 
                piezaMovil = e.currentTarget.innerHTML; 

                // Estilo a la dama seleccionada
                e.currentTarget.querySelector('img[alt="ficha_roja"]').classList.add('pintado');

                // Movimientos posibles
                ubicacion = e.currentTarget.id;
                verificarUbicacionRoja(ubicacion);
                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if(piezaMovilSeleccionada && !e.currentTarget.firstElementChild){
                posicion = e.currentTarget;
                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    tableroArray[fila][columna] = 0;
                    e.currentTarget.innerHTML = piezaMovil;

                    nuevafilaColumna = e.currentTarget;
                    actualizarMatriz(nuevafilaColumna);
                    tableroArray[nuevaFila][nuevaColumna] = 2;

                    // Cambio de turnos
                    turno = 1;
                    cambiarTurno(turno);

                    movimientoRoja(fila, columna);
                }
            } else if (piezaMovilSeleccionada && e.currentTarget.querySelector('img[alt="ficha_roja"]')){
                posicion = e.currentTarget;
                if (posicion == casilla) {
                    // Quitamos estilos porque volvio a seleccionar la misma dama
                    e.currentTarget.querySelector('img[alt="ficha_roja"]').classList.remove('pintado');
                    celda = false;
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    e.currentTarget.innerHTML = piezaMovil;
                    movimientoRoja(fila, columna);
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

/* <---------------Comienza la parte de los MOVIMIENTOS VALIDOS y COMER DAMAS---------------> */

function verificarUbicacionBlanca(ubicacion){
    fila = ubicacion.substring(5, 6); 
    columna = ubicacion.substring(15);
    celda = true; 
    return movimientoBlanca(fila, columna);
}

function actualizarMatriz(nuevafilaColumna){
    nuevaFila = nuevafilaColumna.id.substring(5, 6); 
    nuevaColumna = nuevafilaColumna.id.substring(15);
    return [nuevaFila, nuevaColumna];
}

function movimientoBlanca(fila, columna){
    if (celda) {
        //Se coloca un efecto en las casillas donde puede mover la dama
        if(columna == 7){ 
            fila++;  
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
            if(!ubicacionFinalUno.firstElementChild){
                ubicacionFinalUno.classList.add('movimiento');
                comer = false;
            } else { // Hay una ficha roja?
                if (ubicacionFinalUno.firstElementChild.alt == 'ficha_roja') {
                    console.log('Si, hay una ficha roja');
                    fila++;  
                    columna--;
                    ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                    // Puedo comer esa ficha o hay una ocupando el lugar?
                    if (ubicacionFinalUno != null) {
                        if (ubicacionFinalUno.firstElementChild == null) { 
                            console.log('No, no hay ninguna ficha en esa posicion');
                            ubicacionFinalUno.classList.add('movimiento');
                            comer = true;
                        }
                    }
                }
            }
        } else {
            if(columna == 0){
                fila++;
                columna++;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                    comer = false;
                } else { // Hay una ficha roja?
                    if (ubicacionFinalUno.firstElementChild.alt == 'ficha_roja') {
                        console.log('Si, hay una ficha roja');
                        fila++;  
                        columna++;
                        ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                        // Puedo comer esa ficha o hay una ocupando el lugar?
                        if (ubicacionFinalUno != null) {
                            if (ubicacionFinalUno.firstElementChild == null) { 
                                console.log('No, no hay ninguna ficha en esa posicion');
                                ubicacionFinalUno.classList.add('movimiento');
                                comer = true;
                            }
                        }
                    }
                }
            } else {  
                fila++;
                columna--;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna );
                comerRojas(ubicacionFinalUno, ubicacionFinalDos); 
            }
        }
    } else {
        //Se remueve el efecto en las casillas porque ya movio la dama
        fila++;
        columna++;
        if(columna == 1){ 
            ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
            if (comer) {
                fila++;
                columna++;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
            } else {
                console.log('No puede comer');
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento')
            }
        } else{
            if (columna == 8) {
                columna = columna - 2;
                if (comer) {
                    fila++;
                    columna--;
                    ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                } else {
                    console.log('No puede comer');
                    ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                }
            } else {

                if (comerUno) {
                    console.log('Puede comer la posicion 1');
                    ubicacionFinalUno = document.querySelector('#fila-' + filaUbiUno +'-columna-' + columnaUbiUno ).classList.remove('movimiento');
                } else {
                    console.log('No puede comer la posicion 1');
                    ubicacionFinalUno.classList.remove('movimiento');
                }

                if (comerDos) {
                    console.log('Puede comer la posicion 2');
                    ubicacionFinalDos = document.querySelector('#fila-' + filaUbiDos +'-columna-' + columnaUbiDos ).classList.remove('movimiento');
                }else {
                    console.log('No puede comer la posicion 2');
                    ubicacionFinalDos.classList.remove('movimiento');
                }

            }
        }
    }
}

function comerRojas(ubicacionFinalUno, ubicacionFinalDos){
    
    console.log(ubicacionFinalUno);

    if(!ubicacionFinalUno.firstElementChild){
        console.log('La primera ubicacion NO tiene un hijo');
        ubicacionFinalUno.classList.add('movimiento');
        comerUno = false;
    } else {
        if (ubicacionFinalUno.firstElementChild.alt == 'ficha_roja') {
            console.log('La primera ubicacion tiene un hijo y es roja');
            filaUbiUno = parseInt(fila) + 2;
            if (columna != 1 && columna != 6) {
                columnaUbiUno = parseInt(columna) - 2;
                ubicacionFinalUno = document.querySelector('#fila-' + filaUbiUno +'-columna-' + columnaUbiUno );
            } else {
                if (columna == 1) {
                    columnaUbiUno = columna;
                } else {
                    columnaUbiUno = parseInt(columna) - 2;
                    ubicacionFinalUno = document.querySelector('#fila-' + filaUbiUno +'-columna-' + columnaUbiUno );
                }
            }
            if (ubicacionFinalUno != null) {
                if (ubicacionFinalUno.firstElementChild == null) { 
                    console.log('No, no hay ninguna ficha en esa posicion');
                    ubicacionFinalUno.classList.add('movimiento');
                    comerUno = true;
                }
            }
        }
    } 

    console.log('<=========== CORTE ===========>');

    console.log(ubicacionFinalDos);

    if(!ubicacionFinalDos.firstElementChild){
        console.log('La segunda ubicacion NO tiene un hijo');
        ubicacionFinalDos.classList.add('movimiento');
        comerDos = false;
    } else {
        if (ubicacionFinalDos.firstElementChild.alt == 'ficha_roja') {
            console.log('La segunda ubicacion tiene un hijo y es roja');
            filaUbiDos = parseInt(fila) + 2;
            if (columna != 1 && columna != 6) {
                columnaUbiDos = parseInt(columna) + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + filaUbiDos +'-columna-' + columnaUbiDos );
            } else {
                if (columna == 1) {
                    columnaUbiDos = parseInt(columna) + 2;
                    ubicacionFinalDos = document.querySelector('#fila-' + filaUbiDos +'-columna-' + columnaUbiDos );
                } else {
                    columnaUbiDos = columna;
                }
            }
            if (ubicacionFinalDos != null) {
                if (ubicacionFinalDos.firstElementChild == null) { 
                    console.log('No, no hay ninguna ficha en esa posicion');
                    ubicacionFinalDos.classList.add('movimiento');
                    comerDos = true;
                }
            }
        }
    }
}

function verificarUbicacionRoja(ubicacion){
    fila = ubicacion.substring(5, 6); 
    columna = ubicacion.substring(15);
    celda = true; 
    return movimientoRoja(fila, columna);
}

function movimientoRoja(fila, columna){
    if (celda) {
        //Se coloca un efecto en las casillas donde puede mover la dama
        if(columna == 7){ 
            fila--;  
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
            if(!ubicacionFinalUno.firstElementChild){
                ubicacionFinalUno.classList.add('movimiento');
                comer = false;
            } else { // Hay una ficha roja?
                if (ubicacionFinalUno.firstElementChild.alt == 'ficha_blanca') {
                    console.log('Si, hay una ficha roja');
                    fila--;  
                    columna--;
                    ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                    // Puedo comer esa ficha o hay una ocupando el lugar?
                    if (ubicacionFinalUno != null) {
                        if (ubicacionFinalUno.firstElementChild == null) { 
                            console.log('No, no hay ninguna ficha en esa posicion');
                            ubicacionFinalUno.classList.add('movimiento');
                            comer = true;
                        }
                    }
                }
            }
        } else {
            if(columna == 0){
                fila--;  
                columna++;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                if(!ubicacionFinalUno.firstElementChild){
                    ubicacionFinalUno.classList.add('movimiento');
                    comer = false;
                } else { // Hay una ficha roja?
                    if (ubicacionFinalUno.firstElementChild.alt == 'ficha_blanca') {
                        console.log('Si, hay una ficha roja');
                        fila--;  
                        columna++;
                        ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                        // Puedo comer esa ficha o hay una ocupando el lugar?
                        if (ubicacionFinalUno != null) {
                            if (ubicacionFinalUno.firstElementChild == null) { 
                                console.log('No, no hay ninguna ficha en esa posicion');
                                ubicacionFinalUno.classList.add('movimiento');
                                comer = true;
                            }
                        }
                    }
                }
            } else {
                fila--;  
                columna--;   
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna );
                columna = columna + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna );
                comerBlancas(ubicacionFinalUno, ubicacionFinalDos);
            }
        }
    } else {
        // Se remueve el efecto en las casillas porque ya movio la dama
        fila--;
        if (columna == 7) {
            columna--;
            ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento'); 
            if (comer) {
                fila--;
                columna--;
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
            } else {
                columna--;
                console.log('No puede comer');
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
            }
        } else {
            if (columna == 0) {
                columna++;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                if (comer) {
                    fila--;
                    columna++;
                    ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                } else {
                    columna++;
                    console.log('No puede comer');
                    ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                }
            } else {

                if (comerUno) {
                    console.log('Puede comer la posicion 1');
                    ubicacionFinalUno = document.querySelector('#fila-' + filaUbiUno +'-columna-' + columnaUbiUno ).classList.remove('movimiento');
                } else {
                    console.log('No puede comer la posicion 1');
                    ubicacionFinalUno.classList.remove('movimiento');
                }

                if (comerDos) {
                    console.log('Puede comer la posicion 2');
                    ubicacionFinalDos = document.querySelector('#fila-' + filaUbiDos +'-columna-' + columnaUbiDos ).classList.remove('movimiento');
                }else {
                    console.log('No puede comer la posicion 2');
                    ubicacionFinalDos.classList.remove('movimiento');
                }
            }
        }
    }
}

function comerBlancas(ubicacionFinalUno, ubicacionFinalDos){

    console.log(ubicacionFinalUno);

    if(!ubicacionFinalUno.firstElementChild){
        console.log('La primera ubicacion NO tiene un hijo');
        ubicacionFinalUno.classList.add('movimiento');
        comerUno = false;
    } else {
        if (ubicacionFinalUno.firstElementChild.alt == 'ficha_blanca') {
            console.log('La primera ubicacion tiene un hijo y es blanca');
            filaUbiUno = parseInt(fila) - 2;
            if (columna != 1 && columna != 6) {
                columnaUbiUno = parseInt(columna) - 2;
                ubicacionFinalUno = document.querySelector('#fila-' + filaUbiUno +'-columna-' + columnaUbiUno );
            } else {
                if (columna == 1) {
                    columnaUbiUno = columna;
                } else {
                    columnaUbiUno = parseInt(columna) - 2;
                    ubicacionFinalUno = document.querySelector('#fila-' + filaUbiUno +'-columna-' + columnaUbiUno );
                }
            }
            if (ubicacionFinalUno != null) {
                if (ubicacionFinalUno.firstElementChild == null) { 
                    console.log('No, no hay ninguna ficha en esa posicion');
                    ubicacionFinalUno.classList.add('movimiento');
                    comerUno = true;
                }
            }
        }
    }

    console.log('<=========== CORTE ===========>');

    console.log(ubicacionFinalDos);

    if(!ubicacionFinalDos.firstElementChild){
        console.log('La segunda ubicacion NO tiene un hijo');
        ubicacionFinalDos.classList.add('movimiento');
        comerDos = false;
    } else {
        if (ubicacionFinalDos.firstElementChild.alt == 'ficha_blanca') {
            console.log('La segunda ubicacion tiene un hijo y es blanca');
            filaUbiDos = parseInt(fila) - 2;
            
            if (columna != 1 && columna != 6) {
                columnaUbiDos = parseInt(columna) + 2;
                ubicacionFinalDos = document.querySelector('#fila-' + filaUbiDos +'-columna-' + columnaUbiDos );
            } else {
                if (columna == 1) {
                    columnaUbiDos = parseInt(columna) + 2;
                    ubicacionFinalDos = document.querySelector('#fila-' + filaUbiDos +'-columna-' + columnaUbiDos );
                } else {
                    columnaUbiDos = columna;
                }
            }
            if (ubicacionFinalDos != null) {
                if (ubicacionFinalDos.firstElementChild == null) { 
                    console.log('No, no hay ninguna ficha en esa posicion');
                    ubicacionFinalDos.classList.add('movimiento');
                    comerDos = true;
                }
            }
        }
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

/* <---------------Comienza la parte de GUARDAR, CARGAR y arrancar una NUEVA partida---------------> */
// localStorage: Guarda una cadena de texto, clave => valor
// SET => Guardando
// GET => Obtener

btnNuevaPartida = document.getElementById('nueva_partida').addEventListener('click', nuevaPartida);
btnGuardar = document.getElementById('guardar_partida').addEventListener('click', guardarPartida);
btnCargar = document.getElementById('cargar_partida').addEventListener('click', cargarPartida);

function nuevaPartida(){
    var tableroNuevo = [
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0]
    ];
    
    // Reinicia el tablero
    tableroArray = tableroNuevo;
    tablero.innerHTML = '';
    turno = 1;
    generarTablero();
    moverPiezas();
    cambiarTurno(turno);
    nombreJugadores();
}

function guardarPartida(){
    // Guarda el estado del tablero al momento de darle click al boton Guardar Partida
    localStorage.setItem('partida', JSON.stringify(tableroArray));
    // Guarda el estado de los turnos y nombre de los jugadores
    localStorage.setItem('turno', turno);
    localStorage.setItem('jugador1', nombreJ1);
    localStorage.setItem('jugador2', nombreJ2);
}

function cargarPartida(){
    // Trae la partida guardada
    tableroGuardado = JSON.parse(localStorage.getItem('partida'));
    turno = parseInt(localStorage.getItem('turno'));
    nombreJ1 = localStorage.getItem('jugador1');
    nombreJ2 = localStorage.getItem('jugador2');
    // Carga el tablero guardado
    tableroArray = tableroGuardado;
    // Limpia el tablero
    tablero.innerHTML = '';
    // Carga el tablero con piezas, turnos y nombres de los jugadores
    generarTablero();
    moverPiezas();
    cambiarTurno(turno);
    document.getElementById('jugador1').innerHTML = nombreJ1;
    document.getElementById('jugador2').innerHTML = nombreJ2;
}

/* <---------------Comienza la parte de los NOMBRES para los JUGADORES---------------> */

function nombreJugadores(){
    /* document.getElementById('jugador1').innerHTML = prompt('Ingrese el nombre del primero jugador:');
    document.getElementById('jugador2').innerHTML = prompt('Ingrese el nombre del segundo jugador:'); */
}


/* var puntosJ1 = parseInt(document.getElementById('jugador1_puntos').textContent);
puntosJ1--;
document.getElementById('jugador1_puntos').innerHTML = puntosJ1;

var puntosJ2 = parseInt(document.getElementById('jugador2_puntos').textContent);
puntosJ2--;
document.getElementById('jugador2_puntos').innerHTML = puntosJ2; */