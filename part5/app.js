var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./lib'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const db = require("./public/javascripts/db");
app.post("/postData", db.insertData);

module.exports = app;