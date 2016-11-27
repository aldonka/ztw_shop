/**
 * Created by Dominika on 2016-11-27.
 */
angular.module('myApp')
    .value('OrderLoc', '/orders')
    .factory('Order', ['$resource', 'OrderLoc', 'Path', function ($resource, CategoryLoc, Path) {
        return $resource(Path + CategoryLoc, {}, {
            get : {
                method: 'GET',
                isArray : true
            },
            save : {
                method: 'POST'
            }
        });
    }]);