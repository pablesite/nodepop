'use strict';

const mongoose = require('mongoose');

//  conexión del curso node.js del Bootcamp 
const db = mongoose.connection;

db.on('error', function(err) {
    console.log(err);
});

db.once('open', function() {
    console.info('Conectado a mongodb.');
});


mongoose.connect('mongodb://localhost/nodepop', {useNewUrlParser: true });



