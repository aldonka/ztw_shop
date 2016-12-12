/**
 * Created by Dominika on 2016-11-28.
 */
var product = require('./model');
var router = require('express').Router();
var basic = require('../basic');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function getProducts (req, res) {
    product.findAll(function (error, products) {
        basic.handleResponse(error, products, req, res, 'error finding products');
    });
}

function createProduct (req, res) {
    product.create(req.body, function (error, product) {
        basic.handleResponse(error, product, req, res, 'error while creating product');
        // io.on('connection', function (socket) {
        //     socket.broadcast.emit('product:added', product);
        // });
    });
}

function findById(req, res){
    product.findById(req.params.id, function (error, product) {
        basic.handleResponse(error, product, req, res, 'error finding product id:' + req.params.id);
    })

}

function updateProduct(req, res){
    product.update(req.body, function (error, product) {
        basic.handleResponse(error, product, req, res, 'error while updating product id: ' + req.params.id);
    });
}

function removeProduct(req, res) {
    product.remove(req.params.id, function (error, product) {
        basic.handleResponse(error, product, req, res, 'error removing product id: ' + req.params.id);
    });
}

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', findById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', removeProduct);

module.exports = router;