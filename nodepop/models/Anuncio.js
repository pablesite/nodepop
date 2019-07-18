'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String, 
    tags: [String]
});

anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, cb) {
    let query = Anuncio.find(filter); //no se si esta variable es let...o sería mejor cons
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(cb);
};

//no se si este const puede dar problema. parece que hace hoisting...
const Anuncio = mongoose.model('Anuncio', anuncioSchema);