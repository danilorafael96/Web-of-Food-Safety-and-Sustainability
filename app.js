var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var con= require("./models/MysqlConfig");
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ProdutosAlertasRouter=require('./routes/ProdutosAlertasRouter');
var MapaRouter=require('./routes/MapaRouter');
var CalculadoraRouter=require('./routes/CalculadoraRouter');

app.use(function(req,res,next){
  req.con=con;
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/produtos',ProdutosAlertasRouter);
app.use('/api/mapaInfo',MapaRouter);
app.use('/api/calculadora',CalculadoraRouter);

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
