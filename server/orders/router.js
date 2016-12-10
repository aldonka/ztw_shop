/**
 * Created by Dominika on 2016-11-28.
 */
var order = require('./model');
var router = require('express').Router();
var basic = require('../basic');

function getOrders (req, res) {
    order.findAll(function (error, orders) {
        basic.handleResponse(error, orders, req, res, 'error finding orders');
    });
}

function createOrder (req, res) {
    order.create(req.body, function (error, order) {
        basic.handleResponse(error, order, req, res, 'error while creating order');
    });
}

function removeOrder(req, res) {
    order.remove(req.params.id, function (error, order) {
        basic.handleResponse(error, order, req, res, 'error removing order id: ' + req.params.id);
    });
}

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.delete('/orders/:id', removeOrder);

module.exports = router;