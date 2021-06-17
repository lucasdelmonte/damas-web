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




/* <---------------Comienza la parte de las DAMAS---------------> */

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

/* <---------------Comienza la parte de enfocar, mover las DAMAS y TURNOS de los jugadores---------------> */

/* function seleccionaPieza() {   
    if (turno == 1) {
        if(!piezaMovilSeleccionada && this.firstElementChild) {   
            casilla = this; 
            piezaMovil = this.innerHTML; 
            this.querySelector('img[alt="ficha_blanca"]').classList.add('pintado');  
            piezaMovilSeleccionada = true;
        } else if (piezaMovilSeleccionada){
            posicion = this;
            casilla.innerHTML= '';
            piezaMovilSeleccionada = false;
            this.innerHTML = piezaMovil;
            if(posicion != casilla){
                turno = 2;
            } 
        }
    } else if (turno == 2){
        if(!piezaMovilSeleccionada && this.firstElementChild) {   
            casilla = this; 
            piezaMovil = this.innerHTML; 
            this.querySelector('img[alt="ficha_roja"]').classList.add('pintado'); 
            piezaMovilSeleccionada = true;
        } else if(piezaMovilSeleccionada){
            posicion = this;
            casilla.innerHTML= '';
            piezaMovilSeleccionada = false;
            this.innerHTML = piezaMovil;
            if(posicion != casilla){
                turno = 1;
            } 
        }
    }
} */

function seleccionaPieza() {
    switch (turno) {
        case 1:
            jugador1.style.borderBottom = '4px solid #33ff33';
            jugador1.style.borderRadius = '10px';
            if(!piezaMovilSeleccionada && this.firstElementChild) {   
                casilla = this; 
                piezaMovil = this.innerHTML;
                this.querySelector('img[alt="ficha_blanca"]').classList.add('pintado');
                
                //Movimientos posibles
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

                piezaMovilSeleccionada = true;
            } else if (piezaMovilSeleccionada){
                posicion = this;
                casilla.innerHTML= '';
                piezaMovilSeleccionada = false;
                this.innerHTML = piezaMovil;


                columna = columna + 2;
                if(columna != 8){ 
                    ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                }
                columna = columna - 2;
                ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');

                if(posicion != casilla){
                    turno = 2;
                    jugador1.style.borderBottom = '4px solid #c4c4c4';
                    jugador2.style.borderBottom = '4px solid #33ff33';
                } 
            }  
        break;
        
        case 2:
            if(!piezaMovilSeleccionada && this.firstElementChild) {   
                casilla = this; 
                piezaMovil = this.innerHTML; 
                this.querySelector('img[alt="ficha_roja"]').classList.add('pintado');

                //Movimientos posibles
                ubicacion = this.id;
                fila = ubicacion.substring(5, 6); 
                columna = ubicacion.substring(15);
                ubicacionInicial = document.querySelector('#fila-' + fila +'-columna-' + columna );

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

                piezaMovilSeleccionada = true;
            } else if(piezaMovilSeleccionada){
                posicion = this;
                casilla.innerHTML= '';
                piezaMovilSeleccionada = false;
                this.innerHTML = piezaMovil;

                if(columna != 1){ 
                    columna = columna - 2;
                    ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');
                    
                    columna = columna + 2;
                    ubicacionFinalDos = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');

                }  
                ubicacionFinalUno = document.querySelector('#fila-' + fila +'-columna-' + columna ).classList.remove('movimiento');

                if(posicion != casilla){
                    turno = 1;
                    jugador2.style.borderBottom = '4px solid #c4c4c4';
                    jugador1.style.borderBottom = '4px solid #33ff33';
                } 
            } 
        break;

        default:
        break;
    }
}

var casillas = document.querySelectorAll('td'); 

for(var x = 0; x < casillas.length; x++) {
    casillas[x].addEventListener('click', seleccionaPieza);
}

/* <---------------Comienza la parte de los nombres para los JUGADORES---------------> */

document.getElementById('jugador1').innerHTML = prompt('Ingrese el nombre del primero jugador:');
document.getElementById('jugador2').innerHTML = prompt('Ingrese el nombre del segundo jugador:');
