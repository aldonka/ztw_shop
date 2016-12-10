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
                    $scope.orders[i].orderValue = orderValue($scope.orders[i].orderedProducts);
                    $scope.orders[i].showDetails = false;
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

        function orderValue(products){
            var value = 0;
            for(var i =0; i < products.length; i++){
                if(products[i] != null && products[i] !== undefined){
                    value += products[i].price;
                }
            }
            return value;
        }

        function findOrder(id) {
            for(var i =0; i < $scope.orders.length; i++){
                if($scope.orders[i]._id == id){
                    return $scope.orders[i];
                }
            }
            return null;
        }
    }]);