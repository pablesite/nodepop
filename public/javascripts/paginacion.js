'use strict';

function paginacion(numPags) {
    
    let pags = document.getElementById('pags');
    for (let i = 1; i <= numPags; i++) {
        let li = document.createElement('li');
        li.innerHTML = '<a href=/anuncios?limit=3&skip=' + (i-1)*3 + '>' + i + '</a>';
        pags.appendChild(li);
      }
}