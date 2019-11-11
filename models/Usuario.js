'use strict';

const mongoose = require('mongoose');
const bcrypy = require('bcrypt');
const nodemailer = require('nodemailer');

const usuarioSchema = mongoose.Schema({
    email: String,
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
    // crear un transport
    const transport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: process.env.SENDGRID_USER, 
            pass: process.env.SENDGRID_PASS 
        }
    });

    // enviar el correo
   return transport.sendMail({
        from: from,
        to: this.email,
        subject: subject,  
        html: body,
    });
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;