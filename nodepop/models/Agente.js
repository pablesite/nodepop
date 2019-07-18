'use strict';

var mongoose = require('mongoose');

var agenteSchema = mongoose.Schema({
    name: String,
    age: Number
});

agenteSchema.statics.list = function(filter, limit, skip, fields, sort, cb) {
    var query = Agente.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(cb);
};

var Agente = mongoose.model('Agente', agenteSchema);
