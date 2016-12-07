/**
 * Created by Dominika on 2016-11-28.
 */
var product = require('./model');
var router = require('express').Router();
var basic = require('../basic');

function getProducts (req, res) {
    product.findAll(function (error, products) {
        basic.handleResponse(error, products, req, res, 'error finding products');
    });
}

function createProduct (req, res) {
    product.create(req.body, function (error, product) {
        basic.handleResponse(error, products, req, res, 'error while creating product');
    });
}

function findById(req, res){
    product.findById(req.params.id, function (error, products) {
        basic.handleResponse(error, products, req, res, 'error finding product id:' + req.params.id);
    })

}

function updateProduct(req, res){
    product.update(req.body, function (error, product) {
        basic.handleResponse(error, products, req, res, 'error while updating product id: ' + req.params.id);
    })
}

function removeProduct(req, res) {
    product.remove(req.params.id, function (error, product) {
        if(error){
            console.log(error, 'error removing product id: ' + req.body._id);
            res.status(500).send(error);
            return
        }
        res.status(200).body("Product removed id: " + req.params.id);
    })
}

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', findById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', removeProduct);

module.exports = router;