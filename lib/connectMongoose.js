"use strict";

// Cargando librerías
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Evento para manejar errores
mongoose.connection.on("error", err => {
    console.log("MongoDB connection error", err);
    process.exit(1);
});

// Evento que muestra un mensaje cuando se establece la conexión
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB at", mongoose.connection.name);
});

// Conexión a la base de datos
mongoose.connect("mongodb://127.0.0.1/nodepopAds");

module.exports = mongoose.connection;