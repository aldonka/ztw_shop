/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', 'Product', 'Category', function ($scope, $rootScope, Product, Category) {
        $scope.title = "Sklep spożywczy";
        Category.get({}, function (response) {
            console.log(JSON.stringify(response));
            $scope.categories = response.categories;
        });

        Product.get({}, function (response) {
            $scope.products = response;
        })
    }]);
