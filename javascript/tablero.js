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

                //Movimientos posibles activados
                ubicacion = this.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);
                
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

                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if (piezaMovilSeleccionada && !this.querySelector('img[alt="ficha_blanca"]') && !this.querySelector('img[alt="ficha_roja"]')){
                posicion = this; 

                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    this.innerHTML = piezaMovil;
                    turno = 2;

                    //Quitamos los estilos jugador 1
                    jugador1.style.borderBottom = '4px solid #c4c4c4';
                    //Agregamos los estilos jugador 2
                    jugador2.style.borderBottom = '4px solid #33ff33';
                    
                    //Se remueve el efecto en las casillas porque ya movio la dama
                    columna = columna + 2;
                    if(columna != 8){ 
                        ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                    }
                    columna = columna - 2;
                    ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento'); 
                }
            }
        break;
        
        //Turno del jugador 2
        case 2:
            if(!piezaMovilSeleccionada && this.firstElementChild) {   
                casilla = this; 
                piezaMovil = this.innerHTML; 
                this.querySelector('img[alt="ficha_roja"]').classList.add('pintado');

                //Movimientos posibles activados
                ubicacion = this.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);

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

                movimiento = document.querySelectorAll('.movimiento');

                piezaMovilSeleccionada = true;
            } else if(piezaMovilSeleccionada && !this.querySelector('img[alt="ficha_roja"]') && !this.querySelector('img[alt="ficha_blanca"]')){
                posicion = this; 

                if(posicion != casilla && posicion.id === movimiento[0].id || posicion.id === movimiento[1].id){
                    casilla.innerHTML= '';
                    piezaMovilSeleccionada = false;
                    this.innerHTML = piezaMovil;
                    turno = 1;

                    //Quitamos los estilos jugador 2
                    jugador2.style.borderBottom = '4px solid #c4c4c4';
                    //Agregamos los estilos jugador 1
                    jugador1.style.borderBottom = '4px solid #33ff33';

                    //Se remueve el efecto en las casillas porque ya movio la dama
                    if(columna != 1){ 
                        columna = columna - 2;
                        ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');

                        columna = columna + 2;
                        ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                    }  
                    ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento'); 
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
