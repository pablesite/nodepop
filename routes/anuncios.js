'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
let numPags = 0;

/* Recupero la lista de anuncios */
router.get('/', function(req, res, next){
    
    var filter = {};

    if (req.query.nombre) {
        filter.nombre = req.query.nombre;
    }

    if (req.query.venta) {
        filter.venta = req.query.venta;
    }

    if (req.query.precio) {
        filter.precio = req.query.precio;
    }

    if (req.query.tag) {
        filter.tag = req.query.tag;
    }
   
    var limit = parseInt(req.query.limit) || null;
    var skip = parseInt(req.query.skip) || null;
    var fields = req.query.fields || null;
    var sort = req.query.sort || null;

    /** Lo uso para saber el número de anuncios totales, para paginar. 
    * Pagino cada 3 anuncios de manera estática.    
    */
    Anuncio.find({}).exec(function(err, list){
        numPags = Math.floor(list.length/3);
    });

    Anuncio.list(filter, limit, skip, fields, sort, function(err, list){
        if (err) {
            next(err);
            return;
        }      
        
        /* Renderizo una vista simple */
        res.locals.numPags = numPags;
        res.locals.list = list;
        res.render('anuncios');
        
    });
});


module.exports = router;