'use strict';
// Cargamos variables de configuración del fichero .env
require('dotenv').config();

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
    console.log('The data contained in the nodepop db has been deleted.');

    if (del.ok === 1){ // Comprobación que quizá no sea necesaria.
 
        /* Introduzco datos a la base de datos*/
        let json = require('../lib/anuncios.json');
        let creationDb = await Anuncio.insertMany(json.anuncios);
        console.log('The database has been initialized with the file anuncios.json');

        /* Desconecto la base de datos */
        mongoose.disconnect('mongodb://localhost/nodepop', {useNewUrlParser: true });
        return creationDb;

    }
      throw new Error('Error initializing the db');    
}

async function initUsuarios() {
    await Usuario.deleteMany();
    await Usuario.insertMany([
        {
            email: 'admin@example.com',
            password: await Usuario.hashPassword('1234') //quizá poner el password en el .env
        },
        {
            email: 'pablo.ruiz.molina@gmail.com',
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
        
        //Esto lo meto aquí... ver si se puede organizar mejor.
        initializeDb().catch(err => { //probar a hacerlo con promesas (await). Parece que el catch ya se hace en la función.
            console.log('Failed to complete the initialization of the db.', err);
        });
        //db.close(); //se conoce que se cierra en otro sitio.
    } catch(err) {
        console.log('There was an error', err);
        process.exit(1);
    }
    

    

});












