const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

const mongooseConnection = require('./lib/connectMongoose');
require('./models/Anuncio');


/* View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setup i18n
 */
const i18n = require('./lib/i18nConfigure')(); 
app.use(i18n.init);

//i18n.setLocale('es');
//console.log(i18n.__('EXAMPLE'));

app.locals.title = 'Nodepop';

/**
 * Inicializamos y cargamos la sesión del usuario que hace la petición
 */
app.use(session({
  name: 'nodeapi-session',
  secret: 'l]~G4zXFW%0uZ^dJ30+?A/b1?=bH)8 82kR(J}3O"8E8>;9@&nuS^Me=g>]Vk`em',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, //solo mandar por HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 2 // caducar a los X días de inactividad
  },
  store: new MongoStore({
    // le pasamos cómo conectarse a la bbdd.
    mongooseConnection: mongooseConnection,
  })

}));

// middleware para tener acceso a la sesión en las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/** Rutas de mi aplicación web */
const sessionAuth = require('./lib/sessionAuth');

const loginController = require('./routes/loginController');
const privadoController = require('./routes/privadoController');

app.use('/',                require('./routes/index'));
app.use('/services',        require('./routes/services'));
app.use('/change-locale',   require('./routes/change-locale'));
app.use('/anuncios',        require('./routes/anuncios'));

// Usamos el estilo de Controladores para estructura las rutas siguientes:
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

app.get('/privado', sessionAuth('admin'), privadoController.index);


/** Rutas de mi API */
app.use('/apiv1/anuncios',  require('./routes/apiv1/anuncios'));
app.use('/apiv1/tags',      require('./routes/apiv1/tags'));

/** catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/** error handler */
app.use(function(err, req, res, next) {
  /** comprobar error de validación */
  if (err.array) {
    err.status = 422;
    const errInfo = err.array({onlyFirstError: true})[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`; 
  }

  /** set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /** render the error page */
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
