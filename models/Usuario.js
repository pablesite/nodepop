'use strict';

const mongoose = require('mongoose');
const bcrypy = require('bcrypt');
const nodemailerTransport = require('../lib/nodemailerConfigure');

const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
}, 
{ 
    collection: 'usuarios' //me salto la pluralización
}

);

usuarioSchema.statics.hashPassword = function(plainPassword) {
    return bcrypy.hash(plainPassword, 10);
}

usuarioSchema.methods.sendEmail = function(from, subject, body) {
    
    // enviar el correo
   return nodemailerTransport.sendMail({
        from: from,
        to: this.email,
        subject: subject,  
        html: body,
    });
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;