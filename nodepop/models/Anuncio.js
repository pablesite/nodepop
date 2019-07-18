'use strict';

const mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String, 
    tags: [String]
});

anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, cb) {
    var query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(cb);
};

var Anuncio = mongoose.model('Anuncio', anuncioSchema);