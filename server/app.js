var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors(corsOptions));
//var cors = require('cors')
var indexRouter = require('./routes/utilisateur.routes');
var app = express();
app.use('/uploads', express.static('uploads'));
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
//app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "*" }))
app.use('/api', indexRouter);

var corsOptions = {
  origin: "http://localhost:3000"
};

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({ 'error': err });
});


app.listen(3000, (req, res) => {
  console.log('RUNNING');
});


module.exports = app;
