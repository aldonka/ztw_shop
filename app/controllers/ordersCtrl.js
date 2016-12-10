/**
 * Created by Dominika on 2016-12-10.
 */
angular.module('myApp')
    .controller('ordersCtrl', ['$scope', '$rootScope', '$location', 'OrderService','InfoService', 'Order', 'Product', function ($scope, $rootScope, $location, OrderService, InfoService, Order, Product) {
        loadOrdersWithProducts();

        $scope.removeOrder = function removeOrder(id){
            console.log("remove!: " + id);
            Order.delete({id: id}, function () {
                $scope.info = InfoService.getSuccess("Usunięto zamówienie : " + id);
                InfoService.showInfo($scope.info);
                loadOrdersWithProducts();
            }, function () {
                $scope.info = InfoService.getError("Nie udało się usunąć zamówienia : " + id);
                InfoService.showInfo($scope.info);
            })
        };

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

        function loadOrdersWithProducts() {
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
        }
    }]);