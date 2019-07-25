var express = require('express');
var router = express.Router();

/* Recupero la página principal */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
