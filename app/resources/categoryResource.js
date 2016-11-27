/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .value('CategoryLoc', '/categories')
    .factory('Category', ['$resource', 'CategoryLoc', 'Path', function ($resource, CategoryLoc, Path) {
        return $resource(Path + CategoryLoc, {}, {
            get : {
                method: 'GET',
                isArray : true
            }
        });
    }]);