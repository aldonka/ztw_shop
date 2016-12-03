/**
 * Created by Dominika on 2016-11-28.
 */
var order = require('./model');
var router = require('express').Router();

function getOrders (req, res) {
    order.findAll(function (error, orders) {
        if (error) {
            log.error(error, 'error finding orders');
            res.status(500).send(error);
            return
        }
        res.json(orders)
    });
}

function createOrder (req, res) {
    // res.status(201).send()
    order.create(req.body, function (err, order) {
        if(err){return next(err)}

        res.json(order);
    });
}

router.post('/orders', createOrder);
router.get('/orders', getOrders);

module.exports = router;