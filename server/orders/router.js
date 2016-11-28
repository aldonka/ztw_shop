/**
 * Created by Dominika on 2016-11-28.
 */
var router = require('express').Router();

function getOrders (req, res) {
    res.send("Get Orders!");
}

function createOrder (req, res) {
    res.status(201).send()

}

router.post('/orders', createOrder);
router.get('/orders', getOrders);

module.exports = router;