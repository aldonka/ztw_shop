/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', 'Product', 'Category', 'BasketService', function ($scope, $rootScope, Product, Category, BasketService) {
        $scope.title = "Sklep spożywczy";
        Category.get({}, function (response) {
            $scope.categories = [];
            for (var i = 0; i < response.categories.length; i++) {
                $scope.categories.push({
                    "name": response.categories[i],
                    "checked": true
                });
            }
            console.log(JSON.stringify($scope.categories));
            $scope.shownCategories = $scope.categories;
        });
        $scope.basketBtn = BasketService.noShoppingType();
        Product.get({}, function (response) {
            $scope.products = response;
        });

        $scope.changeCheckbox = function (index) {
            $scope.categories[index].checked = !$scope.categories[index].checked
        };

        $scope.changeBasketBtn = function () {
            $scope.basketBtn = BasketService.changeBtnType($scope.basketBtn);
        };
    }]);
