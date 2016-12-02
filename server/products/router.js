/**
 * Created by Dominika on 2016-11-28.
 */
var product = require('./model');
var router = require('express').Router();

function getProducts (req, res) {
    product.findAll(function (error, categories) {
        if (error) {
            log.error(error, 'error finding categories');
            res.status(500).send(error);
            return
        }
        res.json(categories)
    });
}

function createProduct (req, res) {
    product.create(req.body, function (err, product) {
        if(err){return next(err)}

        res.json(product);
    });
}

router.post('/products', createProduct);
router.get('/products', getProducts);

module.exports = router;