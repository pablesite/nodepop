'use strict';

const mongoose = require('mongoose');

const db = require('../lib/connectMongoose');
require('./Anuncio');
const Anuncio = mongoose.model('Anuncio');
//const Usuario = mongoose.model('Usuario');
const Usuario = require('./Usuario');

/* Uso async/await para hacer que las querys hacia la base de datos sean "síncronas" */
async function initializeDb() {
    
    /* Elimino los elementos de la base de datos */
    let del = await Anuncio.deleteMany({});
    console.log('Los datos contenidos en la db nodepop se han eliminado.');
    if (del.ok === 1){ // Comprobación que quizá no sea necesaria.
 
        /* Introduzco datos a la base de datos*/
        let json = require('../lib/anuncios.json');
        let creationDb = await Anuncio.insertMany(json.anuncios);
        console.log('Se ha inicializado la base de datos con el fichero anuncios.json');

        /* Desconecto la base de datos */
        mongoose.disconnect('mongodb://localhost/nodepop', {useNewUrlParser: true });
        return creationDb;

    }
      throw new Error('Error inicializando la db');    
}

async function initUsuarios() {
    await Usuario.deleteMany();
    await Usuario.insertMany([
        {
            email: 'admin@example.com',
            password: await Usuario.hashPassword('1234')
        }
    ]) ;
}


/* Manejo eventos de la base de datos */
db.on('error', function(err) {
    console.log(err);
});

db.once('open', async function() {
    try{
        await initUsuarios();
        initializeDb().catch(err => {
            console.log('No se ha podido completar la inicialización de la db.', err);
        });
        //db.close(); //se conoce que se cierra en otro sitio.
    } catch(err) {
        console.log('Hubo un error', err);
        process.exit(1);
    }
    

    

});












