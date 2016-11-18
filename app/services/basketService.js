/**
 * Created by Dominika on 2016-11-18.
 */
angular.module('myApp')
    .service('BasketService', [function () {
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
                return basketTypes[0];
            }
        };

    }]);