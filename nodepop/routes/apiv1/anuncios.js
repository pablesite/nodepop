'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');


// recuperar lista de anuncios
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
    

  /*  if (typeof age !== 'undefined') {
        filter.age = age;
    }*/


    //Anuncio.find().exec(function(err, list){ //esto era el método sin filtros, original
    Anuncio.list(filter, limit, skip, fields, sort, function(err, list){
        if (err) {
            next(err);
            return;
        }
       // res.json({ok: true, list: list}); //este es el json del api

        // se puede devolver directamente en el parámetro render
        //res.render('anuncios', {list});
        

        // otra manera de devolver parámetros locales a la vista
        
        
        res.locals.list = list;
        console.log(res)
        res.render('anuncios');

        
    });
});

//crear un anuncio
router.post('/', function(req, res, next){
    var anuncio = new Anuncio(req.body);
    anuncio.save(function(err, anuncioGuardado) {
        if (err) {
            return next(err);
        }
        res.json({ok: true, anuncio: anuncioGuardado});
    });
});


//actualizar un anuncio
router.put('/:id', function(req, res, next){
    var id = req.params.id;
    Anuncio.update({_id: id}, req.body, function(err, anuncio){
        if (err) {
            return next(err);
        }
        res.json({ok: true, anuncio: anuncio});
    });
});

//borrar un anuncio
router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Anuncio.remove({_id: id}, function (err, result){
        if (err) {
            return next(err);
        }
        res.json({ok: true, result: result});
    });
});



module.exports = router;