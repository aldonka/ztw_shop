/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .value('CategoryLoc', 'json/categories.json')
    .factory('Category', ['$resource', 'CategoryLoc', function ($resource, CategoryLoc) {
        return $resource(CategoryLoc, {}, {});
    }]);