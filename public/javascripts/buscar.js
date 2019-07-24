'use strict';

function buscar(){
    let textBuscar = document.getElementById('textBuscar').value;
    window.location = '/anuncios?nombre=' + textBuscar;
}
    
