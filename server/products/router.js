/**
 * Created by Dominika on 2016-11-28.
 */
var router = require('express').Router();

function getProducts (req, res) {
    res.send("Get Products!");
}

function createProduct (req, res) {
    res.status(201).send()

}

router.post('/products', createProduct);
router.get('/products', getProducts);

module.exports = router;