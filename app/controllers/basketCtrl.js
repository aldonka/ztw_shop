/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .controller('basketCtrl', ['$scope', '$rootScope', '$location', 'BasketService', 'OrderService', function ($scope, $rootScope, $location, BasketService, OrderService) {
        $scope.title = "Koszyk";
        $scope.orderTitle = "Zamów: Dane osobowe";
        $scope.products = BasketService.getBasket();
        $scope.basketSize = BasketService.basketSize();
        $scope.returnToShop = function () {
            $location.path('/');
        };

        $scope.sumBasket = function () {
            var total = 0;
            for (var i = 0; i < $scope.products.length; i++) {
                total += $scope.products[i].price;
            }
            return total;
        };

        $scope.cancelOrder = function () {
            BasketService.clearBasket();
            $location.path('/');
        };

        $scope.continueShopping = function () {
            $location.path('/');
        };
        $scope.removeFromBasket = function (index) {
            $scope.products = BasketService.removeFromBasket(index);
        };
        $scope.orderForm = function () {
            $scope.order = { name: '', address: '' };
            $location.path('/order');
        };

        $scope.createOrder = function () {
            if ($scope.orderForm.$valid) {
                OrderService.createOrder($scope.order,$scope.products);
                // $scope.resetOrder();
                console.log('User saved, info: ' + JSON.stringify($rootScope.info));

            } else {
                console.log("There are invalid fields");
            }
        };

        $scope.resetOrder = function() {
            $scope.order = { name: '', address: '' };

        };

    }]);