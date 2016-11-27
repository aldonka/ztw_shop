/**
 * Created by Dominika on 2016-11-27.
 */
angular.module('myApp')
    .service('InfoService', [function () {
        var info = {
            msg : "test",
            show : false,
            cssClass : "alert-info"
        };
        return {
            getInfo : function (msg, show) {
                info.msg = msg;
                info.show = show;
                return info;
            }
        }
    }]);