/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .service('BasketService', ['$cookies', 'Product', function ($cookies, Product) {
        var basketTypes =  [{
           title : 'Zakupy',
            btn_class : 'btn-sm btn-warning'
        },{
            title : 'Zakończ zakupy',
            btn_class : 'btn-sm btn-danger'
        } ];

        return {
            ifIsShopping : function (btnType) {
                return btnType.title == basketTypes[0].title;
            },
            changeBtnType : function (currentType) {
                return currentType.title == basketTypes[0].title ? basketTypes[1] :  basketTypes[0];
            },
            noShoppingType: function () {
                $cookies.remove('basket');
                return basketTypes[0];
            },
            addToBasket : function (productIndex) {
                var BasketArr  = $cookies.get('basket');
                if(BasketArr == null || BasketArr === undefined){
                    BasketArr = productIndex;
                }else{
                    BasketArr +=("," + productIndex);
                }
                $cookies.remove('basket');

                $cookies.put('basket', BasketArr);
                console.log("New val: " + $cookies.get('basket'));
            },
            getBasket : function () {
                var products = [];
                var inBasket = $cookies.get('basket').split(',');
                Product.get({}, function (response) {
                    for(var index in inBasket){
                        products.push(response[index]);
                    }
                });
                return products;
            }
        };

    }]);