var express = require('express');
var jade=require('jade');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
//var mongoStore = require('connect-mongodb');
var mongoStore = require('connect-mongo')(session)
//设置配置
var logger  = require('morgan');

var index = require('./routes/index');
var users = require('./routes/users');
var settings = require('./settings');


var app = express();
var dbUrl='mongodb://localhost/movie';


// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');
app.locals.moment=require('moment')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//添加session
app.use(session({
	resave:false,//添加这行  
  	saveUninitialized: true,//添加这行   
  	secret: settings.cookieSecret,  
  	key: settings.db,//cookie name  
  	cookie: {maxAge: 60000},//30 days
  	store: new mongoStore({  
    url:dbUrl,
    collection:'sessions'
  })  
}));

//添加配置
if('development'===app.get('env')){
  app.set('showStackError',true);
  app.use(logger(':method :url :status'));
  app.locals.pretty=true;
  mongoose.set('debug',true);
}


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
