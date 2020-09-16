var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var vwokRouter = require('./routes/vwok.js');

var app = express();


app.all("*", function(req, res, next) {
	var orginList = [
		"http://192.168.1.102:8081",
		"http://192.168.1.102:8080",
	]
	if (orginList.includes(req.headers.origin)) {
		//设置允许跨域的域名，*代表允许任意域名跨域
		res.header("Access-Control-Allow-Origin", req.headers.origin);
	}
	// res.clearCookie('id')
	// res.cookie(prop, '', {expires: new Date(0)});
	res.set("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT");
	res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.set("Access-Control-Allow-Credentials", true);
	// res.set('Access-Control-Allow-Max-Age', 3600);
	if ("OPTIONS" === req.method) return res.sendStatus(200);
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 设置请求格式
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', indexRouter);
app.use('/vwok', vwokRouter);

require('./database/init.js')
require('./database/models/Users.js')
require('./database/models/Main_Works.js')

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
