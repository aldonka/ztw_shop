/**
 * Created by Dominika on 2016-12-10.
 */
angular.module('myApp')
    .controller('ordersCtrl', ['$scope', '$rootScope', '$location', 'OrderService', 'Order', 'Product', function ($scope, $rootScope, $location, OrderService, Order, Product) {
        Order.get({}, function (response) {
            $scope.orders = response;
            Product.get({}, function (products) {
                $scope.products = products;
                for(var i = 0; i < $scope.orders.length; i++){
                    $scope.orders[i].orderedProducts = [];
                    for(var j = 0; j < $scope.orders[i].products.length; j++){
                        $scope.orders[i].orderedProducts.push(findProduct($scope.products, $scope.orders[i].products[j]))
                    }
                }
            });
        });

        function findProduct(products, id) {
            for(var i = 0; i < products.length; i++){
                if(products[i]._id == id)
                    return products[i];
            }
            return null;
        }

    }]);