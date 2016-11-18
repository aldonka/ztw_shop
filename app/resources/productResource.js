/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .value('ProductLoc', 'json/products.json')
    .factory('Product', ['$resource', 'ProductLoc', function ($resource, ProductLoc) {
        return $resource(ProductLoc, {}, {
            get : {
                method: 'GET',
                isArray : true
            }
        });
    }]);