/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .controller('basketCtrl', ['$scope', '$rootScope', '$location', 'BasketService', function ($scope, $rootScope, $location, BasketService) {
        $scope.title = "Koszyk";
        $scope.products = BasketService.getBasket();

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
        }

    }]);