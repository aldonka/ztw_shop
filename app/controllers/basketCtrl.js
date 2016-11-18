/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .controller('basketCtrl', ['$scope', '$rootScope', '$location', 'BasketService', function ($scope, $rootScope, $location, BasketService) {
        $scope.title = "Koszyk";
        $scope.products = BasketService.getBasket();

        $scope.returnToShop = function () {
            $location.path('/');
        }
    }]);