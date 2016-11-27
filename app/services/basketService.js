/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .service('BasketService', ['$cookies', 'Product', function ($cookies, Product) {
        var basketTypes =  [{
           title : 'Zakupy',
            btn_class : 'btn btn-sm btn-warning'
        },{
            title : 'Zakończ zakupy',
            btn_class : 'btn btn-sm btn-danger'
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
            },
            basketSize: function () {
                var basket = $cookies.get('basket');
                return basket === undefined || basket == null ? 0 :$cookies.get('basket').split(',').length;
            },
            getBasket : function () {
                var allProducts = [];
                var products = [];
                var inBasket = $cookies.get('basket').split(',');
                if(inBasket == null || inBasket === undefined){
                    return products;
                }
                Product.get({}, function (response) {
                    // var c = $cookies.get('products');
                    // allProducts =( c == null || c === undefined) ? response : response.concat(JSON.parse($cookies.get("products")));
                    allProducts = response;
                    for(var index=0; index < inBasket.length; index++){
                        products.push(allProducts[inBasket[index]]);
                    }
                });
                return products;
            },
            clearBasket: function () {
                $cookies.remove('basket');
            }
        };

    }]);