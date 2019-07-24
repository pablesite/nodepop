var express = require('express');
var router = express.Router();

const {query, validationResult } = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Función para validar ciertos parámetros. Esto es un ejemplo
router.get('/enquerystring',
  query('color').isLowercase().withMessage('must be lower case'),
  query('talla').isNumeric().withMessage('must be numeric'),
  (req, res, next) => {
    validationResult(req).throw(); //lanza excepción si no valida
    // si llego aquí es que los parámetros de entrada son válidos
    console.log('req.query', req.query);
    res.send('ok');

  }

);
  

module.exports = router;
