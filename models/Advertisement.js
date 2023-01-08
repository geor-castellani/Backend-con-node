"use strict";

// Cargando librerías
const mongoose = require("mongoose");

// Definición de Schema 
const adSchema = mongoose.Schema({
    name: String,
    forSale: Boolean,
    price: Number,
    image: String,
    tags: [String]
});

// Métodos estáticos
adSchema.statics.list = function(filtro, skip, limit, fields, sort) {
    const query = Advertisement.find(filtro); 
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort)
    return query.exec(); 
}

adSchema.statics.listTags = function() {
    const query = Advertisement.distinct("tags"); 
    return query.exec(); 
}

// Creación de modelos
const Advertisement = mongoose.model("Advertisement", adSchema);

module.exports = Advertisement;