var express = require("express");
var router = express.Router();

// OBTENER la página de inicio. 
router.get("/", function(req, res, next) {
  res.render("index");
});

module.exports = router;
