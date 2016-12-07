/**
 * Created by Dominika on 2016-12-02.
 */
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: Number,
    img: String,
    description: String
});

Product = mongoose.model('Product', ProductSchema);

function findAll(callback) {
    Product.find(callback);
}

function create(newProduct, callback) {
    var product = new Product(newProduct);

    product.save(callback);
}

function update(newProduct, callback) {
    Product.findOneAndUpdate({_id: newProduct._id}, newProduct, callback);
}

function remove(id, callback) {
    Product.findByIdAndRemove(id, callback);
}

function findById(id, callback) {
    Product.findById(id, callback);
}
exports.findAll = findAll;
exports.create = create;
exports.findById = findById;
exports.update = update;
exports.remove = remove;
