'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');




// recuperar lista de anuncios
router.get('/', function(req, res, next){
    
    var name = req.query.name;
    var age = req.query.age;

    var limit = parseInt(req.query.limit) || null;
    var skip = parseInt(req.query.skip) || null;
    var fields = req.query.fields || null;
    var sort = req.query.sort || null;

    var filter = {};

    if (name) {
        filter.name = name;
    }

    if (typeof age !== 'undefined') {
        filter.age = age;
    }

    //Anuncio.find().exec(function(err, list){ //esto era el método sin filtros, original
    Anuncio.list(filter, limit, skip, fields, sort, function(err, list){
        if (err) {
            next(err);
            return;
        }
        //res.json({ok: true, list: list}); //este es el del api

        //res.locals.list = list;
        res.render('anuncios', {list});
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