/**
 * Created by Dominika on 2016-11-28.
 */
// var customer = require('./customer-model')
var router = require('express').Router();

function getCategories (req, res) {
    // customer.findAll(function (error, customers) {
    //     if (error) {
    //         log.error(error, 'error finding customers')
    //         res.status(500).send(error)
    //         return
    //     }
    //     res.json(customers)
    // })
    res.send("Get Categories!");
}

function createCategory (req, res) {
    res.status(201).send()

}

router.post('/categories', createCategory);
router.get('/categories', getCategories);

module.exports = router;