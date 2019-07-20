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

mongoose.connect('mongodb://localhost/cursonode', {useNewUrlParser: true });


// Actualizo conexión con código más moderno

/*
const dbpath = "mongodb://localhost:27017/cursonode";

const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
mongo.then(() => {
console.log('Conectado a MongoDB');
}).catch((err) => {
console.log('err', err);
});
*/



