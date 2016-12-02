/**
 * Created by Dominika on 2016-11-28.
 */

var express = require('express');
var mongoose = require('mongoose');

var app = express();

require('./categories/model');
app.use('/api', require('./categories/router'));
app.use('/api', require('./products/router'));
app.use('/api', require('./orders/router'));
// Repeat the above line for additional model areas ("deals", "vehicles", etc)

// FINALLY, use any error handlers
// app.use(require('app/errors/not-found'))

mongoose.connect('mongodb://localhost/shop_app');
module.exports = app;