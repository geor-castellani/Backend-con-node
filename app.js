
// Cargando librerías
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Cargando modules
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("./lib/connectMongoose");
require("./routes/api/advertisements");

var app = express();

// Declaración de variables globales
app.locals.title = "NodePop";

// Ver configuración del motor
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// API ruta
app.use("/api/advertisements", require("./routes/api/advertisements"));

// Website rutas
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 y reenvíar al controlador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Comprobar si hay error de validación
  if(err.array){
    err.status = 422;
    const errorInfo = err.array({ onlyFirstError: true}) [0]; 
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`
  }

  res.status(err.status || 500);

  // Para solicitudes de API, respuestas de error en JSON
  if(req.originalUrl.startsWith("/api/")){
    res.json({ error: err.message });
    return;
  }

  // Establecer locales, solo proporcionando error en el desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Renderizar la página de error
  res.render("error");
});

module.exports = app;
