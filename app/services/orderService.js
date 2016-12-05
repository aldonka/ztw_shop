/**
 * Created by Dominika on 2016-11-27.
 */
angular.module('myApp')
    .service('OrderService', ['$timeout', '$location','$rootScope', 'Order', 'InfoService', 'BasketService', function ($timeout, $location, $rootScope, Order, InfoService, BasketService) {
        return {
            createOrder : function (order, products) {
                if(BasketService.basketSize() == 0){
                    $rootScope.info = InfoService.getWarning("Koszyk jest pusty, nie można utworzyć zamówienia.");
                    InfoService.showInfo($rootScope.info);
                    $location.path('/');
                }else {
                    order.products = [];
                    order.orderDate = Date.now();
                    for(var i = 0 ; i < products.length; i++){
                        console.log("Add product: " + products[i]._id);
                        order.products.push(products[i]._id);
                    }
                    Order.save(order,function (response) {
                        BasketService.clearBasket();
                        $rootScope.info = InfoService.getSuccess("Utowrzono zamówienie. Dziękujemy za zainteresowanie naszą oferta.");
                        InfoService.showInfo($rootScope.info);
                        $location.path('/');
                    }, function (err) {
                        $rootScope.info = InfoService.getError("Nie można utworzyć zamówienia. Problemy z połączeniem z serwerem. Błąd: " + err);
                        InfoService.showInfo($rootScope.info);
                        $location.path('/');
                    });
                }

            }
        }
    }]);