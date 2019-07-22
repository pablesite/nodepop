'use strict'

function buscar()
{
    let textBuscar = document.getElementById("textBuscar").value;
    window.location = '/apiv1/anuncios?nombre=' + textBuscar;
   
}
    
