const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');
const i18n = require('i18n');


const JwKey = "e062dcb0bf3b2ab1bb1d1365a6fc81ed"

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const copiesRouter = require('./routes/copies');
const bookingsRouter = require('./routes/bookings');
const awaitlistsRouter = require('./routes/awaitlists');

const app = express();

// mongodb://<dbUser>?:<dbPass>?@<url>:<port>/<dbName>

const url= "mongodb://localhost:27017/Video-clubDo";
mongoose.connect(url);

const db= mongoose.connection;

db.on('open', ()=>{
  console.log("Sí se pudo :D");
});

db.on('error', ()=>{
  console.log("No se pudo D:");
});

i18n.configure({
  locales:['es','en'],
  cookie:'language', 
  director:`${__dirname}/locales ` //donde van a estar los archivos de interna.
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

/*
app.use(expressjwt({secret:JwKey, algorithms:['HS256']})
   .unless({path:["/login", "/users", "/users/:id"]})); 
   //Que de todo no voy a bloquear aquí agregamos users pq vamos a tomar un valor de ahi
*/
//Midelware de ruteoo
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/copies', copiesRouter);
app.use('/bookings', bookingsRouter);
app.use('/awaitlists', awaitlistsRouter);
app.use('/login', indexRouter);

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
  res.render('error');
});

module.exports = app;
