'use strict';

var mongoose = require('mongoose');

require('../lib/connectMongoose')
require('./Anuncio');

const Anuncio = mongoose.model('Anuncio');
const conn = mongoose.connection;

async function initializeDb() {

    //delete our db
    let del = await Anuncio.deleteMany({});
    console.log('Los datos contenidos en la db nodepop se han eliminado.')
    if (del.ok === 1){
 
        //generate db with anuncios.json
        let json = require('../lib/anuncios.json');
        let creationDb = await Anuncio.insertMany(json.anuncios);
        console.log('Se ha inicializado la base de datos con el fichero anuncios.json')

        //desconexión de la db
        mongoose.disconnect('mongodb://localhost/nodepop', {useNewUrlParser: true });
        return creationDb;

    }
      throw new Error('Error inicializando la db');    
}


conn.on('error', function(err) {
    console.log(err);
});

conn.once('open', function() {

    initializeDb();

});












