/**
 * Created by Dominika on 2016-11-28.
 */
var category = require('./model');
var router = require('express').Router();

function getCategories(req, res) {
        category.findAll(function (error, categories) {
            if (error) {
                log.error(error, 'error finding categories');
                res.status(500).send(error);
                return
            }
            res.json(categories)
        });

}

function createCategory(req, res) {
    category.create(req.body, function (err, category) {
        if(err){return next(err)}

        res.json(category);
        // res.status(201).send()
    });
}

router.post('/categories', createCategory);
router.get('/categories', getCategories);

module.exports = router;