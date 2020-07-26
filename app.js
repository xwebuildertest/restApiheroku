const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const moovesRouter = require('./routes/mooves');
const directorsRouter = require('./routes/directors');

const app = express();

// MongoDbga onlayn tarizda ulandik! 
const db = require('./helper/db')();


// CONFIG SECRET KEY : MAHFIY KALITIMIZ 
const config = require('./config');

app.set('api_secret_key', config.api_secret_key)


// Middlewere

const tokenVerify = require('./middleware/token-verify');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', tokenVerify);
app.use('/api/movies', moovesRouter);
app.use('/api/directors', directorsRouter);

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
  res.json({error: { message: err.message, code: err.code}})

  // res.render('error');


});

module.exports = app;
