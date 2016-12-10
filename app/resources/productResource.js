/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .value('ProductLoc', '/products/:id')
    .factory('Product', ['$resource', 'ProductLoc', 'Path', function ($resource, ProductLoc, Path) {
        return $resource(Path + ProductLoc, {}, {
            get : {
                method: 'GET',
                isArray : true
            },
            save : {
                method: 'POST'
            },
            delete: {
                method: 'DELETE',
                isArray: false
            }
        });
    }]);