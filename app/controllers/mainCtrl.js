/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', '$location', 'Product', 'Category', 'BasketService', function ($scope, $rootScope, $location, Product, Category, BasketService) {
        $scope.title = "Sklep spożywczy";
        $scope.basketSize = BasketService.basketSize();
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

        $scope.isShopping = function () {
            return BasketService.ifIsShopping($scope.basketBtn);
        };

        $scope.changeCheckbox = function (index) {
            $scope.categories[index].checked = !$scope.categories[index].checked
        };

        $scope.changeBasketBtn = function () {
            $scope.basketBtn = BasketService.changeBtnType($scope.basketBtn);
        };

        $scope.addToBasket = function (index) {
            BasketService.addToBasket(index);
            $scope.basketSize = BasketService.basketSize();
        }

        $scope.basketAction = function () {
            $scope.changeBasketBtn();
            if(BasketService.ifIsShopping($scope.basketBtn)){
                $location.path('/basket');
            }
        }

        $scope.addProductAction = function () {
            $location.path('/add_product');
        }

        $scope.returnToShop = function () {
            $location.path('/');
        }
    }]);
