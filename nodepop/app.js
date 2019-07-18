const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

require('./lib/connectMongoose');
require('./models/Agente');
require('./models/Anuncio');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
  // Una de 2 cosas:
  // - Responder
  //res.send('ok');
  // - o Llamar a next
  //console.log('Petición a', req.originalUrl);
  //next(new Error('cosa mala'));
  next();
});
/**
 * Rutas de mi aplicación web
 */
app.use('/',                require('./routes/index'));
app.use('/apiv1/agentes',   require('./routes/apiv1/agentes'));
app.use('/apiv1/anuncios',  require('./routes/apiv1/anuncios'));

//prueba para cargar imágenes....
//app.get("/", express.static(path.join(__dirname, "./public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (isAPI(req)){
    res.json({ok: false, err: err.message});
    return;
  }
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}


module.exports = app;
