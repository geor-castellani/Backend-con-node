"use strict";

// Cargando librerías
const express = require("express");
const createError = require("http-errors");
const Advertisement = require("../../models/Advertisement");

// Creación del router
const router = express.Router();

// Método estático
// GET /api/advertisements   
router.get("/", async (req, res, next) => {
    try{
        // Filtros por nombre, venta, precio y etiqueta
        const name = req.query.name;           
        const forSale = req.query.forSale;     
        const price = req.query.price;         
        const tags = req.query.tags;           
        // Paginación                             (e.g. /api/advertisements?skip=1&limit=2)
        const skip = req.query.skip;
        const limit = req.query.limit;
        // Selección de campo                     (e.g. /api/advertisements?fields=name)
        const fields = req.query.fields; 
        // Tipo                                   (e.g. /api/advertisements?sort=price)
        const sort = req.query.sort; 

        const filter = {};
        if (name) {
            filter.name = new RegExp("^" + name, "i"); ;
        }
        if (tags) {
            filter.tags = {$in: tags};
        }
        if (forSale) {
            filter.forSale = forSale;
        }
        if (price) {
            if (price.includes("-")) {
                const prices = price.split("-");
                if(prices[0] === "") {
                    filter.price = {$lte: prices[1]};
                } else if (prices[1] === "") {
                    filter.price = {$gte: prices[0]};
                } else {
                    filter.price = {$gte: prices[0], $lte: prices[1]}
                }
            } else {
                filter.price = price;
            }
        }

        const advertisements = await Advertisement.list(filter, skip, limit, fields, sort); 
        res.json({ ads: advertisements });
    } catch(err) {
        next(err);
    }
});

//GET /api/advertisements/tags (e.g. /api/advertisements/tags)
router.get("/tags", async (req, res, next) => {
    try {
        const existingTags = await Advertisement.listTags();
        res.json({ tags: existingTags });
    } catch(err) {
        next(err);
    }
});

//POST /api/advertisements   (body=adData)
router.post("/", async (req, res, next) => {
    try {
        const adData = req.body;
        const advertisement = new Advertisement(adData);
        const savedAd = await advertisement.save()
        res.json({ ad: savedAd });
    } catch(err) {
        next(err);
    }
});

module.exports = router;

