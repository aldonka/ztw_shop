/**
 * Created by Dominika on 2016-12-02.
 */
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    order_date : Date,
    name : String,
    address : String,
    products : Array
});

Order = mongoose.model('Order', OrderSchema);

function findAll(callback) {
    Order.find(callback);
}

function create(newOrder, callback){
    var order = new Order(newOrder);

    order.save(callback);
}

function findById(id, callback) {
    Order.findById(id, callback);
}

exports.findAll = findAll;
exports.create = create;
exports.findById = findById;