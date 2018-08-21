// created with express-generator 
// npm install express-generator -g
// express conFusionServer
// npm i
// npm start
// npm i bluebird mongoose mongoose-currency --save
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

// schemas for data
const mongoose = require('mongoose');
// models of schemas for data in database
const Dishes = require('./models/dishes');
const Leaders = require('./models/leaders');
const Promotions = require('./models/promotions');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true });

// database connect
connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {
  // cookies does not exist
  if (!req.session.user) {
    var err = new Error('You are not authenticated!');     
    err.status = 403;
    return next(err);
  } else { // cookies does exist - check
    if (req.session.user === 'authenticated') {
      next();
    } else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

// custom routers, witch process various http-methods: GET/POST/PUT/DELETE
// for each endpoint
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

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
