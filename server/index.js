/**
 * Created by Dominika on 2016-11-28.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var cors = require('cors');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// use it before all route definitions
app.use(cors({origin: 'http://localhost:63342'}));

io.on('connection', function(socket){
    console.log('A user connected');

    //Send a message after a timeout of 4seconds
    setTimeout(function(){
        socket.send('Sent a message 4seconds after connection!');
    }, 4000);
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('product:add', function (data) {
        console.log('A product added: ' + data.name);
        socket.broadcast.emit('product:added', data);
    });

    socket.on('product:remove', function (data) {
        console.log('A product has been removed: ' + data);
        socket.broadcast.emit('product:removed', data);
    });

    socket.on('product:update', function (data) {
        console.log('Product has been updated: ' + data._id);
        socket.broadcast.emit('product:updated', data);
    })
});

http.listen(3880, function(){
    console.log('Socket.io listening on *:3880');
});

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