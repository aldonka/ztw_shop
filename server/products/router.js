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
    product.findById(req.param("id"), function (error, products) {
        if (error) {
            log.error(error, 'error finding categories');
            res.status(500).send(error);
            return
        }
        res.status(200).json(products)
    })

}

function updateProduct(req, res){
    product.update(req.body, function (error, product) {
        if(error){
            console.log(error, 'error updating product id: ' + req.body._id);
            res.status(500).send(error);
            return
        }
        res.status(200).json(product)
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