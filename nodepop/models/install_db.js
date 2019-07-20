'use strict';

require('./Anuncio');
var json = require('../lib/anuncios.json');
var mongoose = require('mongoose');

console.log("Test de script de lanzamiento de db")


//  conexión del curso node.js del Bootcamp 
const db = mongoose.connection;

db.on('error', function(err) {
    console.log(err);
});

db.once('open', function() {
    console.info('Conectado a mongodb.');

    Anuncio.delete_('Pablo', function(err, list){
        if (err) {
            next(err);
            return;
        }
       
    });

   
    Anuncio.create_(json, function(err, list){
        if (err) {
            next(err);
            return;
        }
       
    });


});

mongoose.connect('mongodb://localhost/cursonode', {useNewUrlParser: true });

var Anuncio = mongoose.model('Anuncio');










