/**
 * Created by Dominika on 2016-11-07.
 */
angular.module('myApp')
    .controller('mainCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'Product', 'Category', 'BasketService', function ($scope, $rootScope, $location, $cookies, Product, Category, BasketService) {
        $scope.$watch('products', function (oldVal, newVal ) {
            console.log("New wal" + JSON.stringify(newVal));
        });
        $scope.title = "Sklep spożywczy";
        $scope.newProducts = (function () {
            var c = $cookies.get('products');
            return c == null || c === undefined ? [] : JSON.parse($cookies.get("products"));
        })();
        $scope.newProduct = {};
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
            var c = $cookies.get('products');
            $scope.products =( c == null || c === undefined) ? response : response.concat(JSON.parse($cookies.get("products")));
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
        };

        $scope.basketAction = function () {
            $scope.changeBasketBtn();
            if (BasketService.ifIsShopping($scope.basketBtn)) {
                $location.path('/basket');
            }
        };

        $scope.addProductAction = function () {
            $location.path('/add_product');
        };

        $scope.returnToShop = function () {
            $location.path('/');
        };

        $scope.addProduct = function () {
            if ($scope.newProducts == null || $scope.newProducts === undefined) {
                $scope.newProducts = [];
            }
            $scope.newProduct.category = getCategoryId($scope.newProduct.category);
            $scope.newProducts.push($scope.newProduct);
            $cookies.remove('products');
            $cookies.put('products', JSON.stringify($scope.newProducts));
            console.log(JSON.stringify($scope.newProduct));

            $location.path('/');
        };

        getCategoryId = function (catString) {
            for(var i = 0; i < $scope.categories.length; i++){
                if($scope.categories[i].name == catString){
                    return i;
                }
            }
        }
    }]);
