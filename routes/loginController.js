'use strict';
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// Creamos un Controller que nos servirá para asociar rutas en app.js

class LoginController {

    /**
     * GET /login 
     */
    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    /**
     * POST /login 
     */
    async post(req, res, next) {

        try {
            //recoger parámetros del cuerpo de la petición
            const email = req.body.email;
            const password = req.body.password;

            // buscar el usuario en la base de datos
            const usuario = await Usuario.findOne({ email: email });

           // if (!usuario || password !== usuario.password) {
            if (!usuario || !await bcrypt.compare(password, usuario.password)) {
                res.locals.email = email;
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;
            }

            // si encuentro el usuario, y coincide la password
            res.redirect('/privado');

        } catch(err) {
            next(err);
        }



    }

}

module.exports = new LoginController();