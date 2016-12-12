'use strict';
angular.module('myApp', [
    'ngRoute', 'ngResource', 'ngAnimate', 'ngCookies'
])
    .value('Path', 'http://localhost:3000/api')
    .value('SocketPath', 'http://localhost:3880')
    // .value('Path', 'http://localhost:2403')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            })
            .when('/console', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            })
            .when('/add_product', {
                templateUrl: 'views/add_product.html',
                controller: 'mainCtrl'
            })
            .when('/modify_products', {
                templateUrl: 'views/admin/modify_products.html',
                controller: 'mainCtrl'
            })
            .when('/basket', {
                templateUrl: 'views/basket.html',
                controller: 'basketCtrl'
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'basketCtrl'
            })
            .when('/orders', {
                templateUrl: 'views/admin/show_orders.html',
                controller: 'ordersCtrl'
            })
            .otherwise({
                redirectTo: '/main'
            });


    }])
    .run(['$rootScope', 'SessionService', function ($rootScope, SessionService) {
        SessionService.isAdmin();
        $rootScope.logInAsAdmin = function () {
            console.log("Log in as adin");
            SessionService.logInAdmin();
        };
        $rootScope.logout = function () {
            SessionService.logout();
        }
    }]);
