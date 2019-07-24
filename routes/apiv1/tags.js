'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');


// recuperar lista de tags
router.get('/', function(req, res, next){
 
    Anuncio.find().exec(function(err, list){ //esto era el método sin filtros, original
    //Anuncio.list(filter, limit, skip, fields, sort, function(err, list){
        if (err) {
            next(err);
            return;
        }

        // Obtengo las tags de cada anuncio y las pongo en el array tags
        let tags = [];
        list.forEach(function(element, index){
            list[index].tag.forEach(function(el, ind){
                tags.push(list[index].tag[ind]);
            });          
        });

        //f unción que devuelve elementos únicos en un array.
        Array.prototype.unique=function(a){
            return function(){
                return this.filter(a);
            };
        }(function(a,b,c){
                return c.indexOf(a,b+1)<0;
        });
          
        res.json({ok: true, tags: tags.unique()}); //este es el json del api
        
    });
});


module.exports = router;