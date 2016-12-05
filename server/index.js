/**
 * Created by Dominika on 2016-11-28.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var cors = require('cors');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// use it before all route definitions
app.use(cors({origin: 'http://localhost:63342'}));

//db model files
require('./categories/model');
require('./products/model');
require('./orders/model');

app.use('/api', require('./categories/router'));
app.use('/api', require('./products/router'));
app.use('/api', require('./orders/router'));

// FINALLY, use any error handlers
// app.use(require('app/errors/not-found'))

mongoose.connect('mongodb://localhost/shop_app');
module.exports = app;