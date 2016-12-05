/**
 * Created by Dominika on 2016-11-28.
 */
var product = require('./model');
var router = require('express').Router();

function getProducts (req, res) {
    product.findAll(function (error, products) {
        if (error) {
            log.error(error, 'error finding categories');
            res.status(500).send(error);
            return
        }
        res.status(200).json(products)
    });
}

function createProduct (req, res) {
    product.create(req.body, function (err, product) {
        if(err){return next(err)}

        res.json(product);
    });
}

function findById(req, res){
    product.findById(req.param("id"))
}

router.post('/products', createProduct);
router.get('/products', getProducts);

module.exports = router;