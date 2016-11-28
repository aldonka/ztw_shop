'use strict';
angular.module('myApp', [
    'ngRoute', 'ngResource', 'ngAnimate', 'ngCookies'
])
    .value('Path', 'http://localhost:2403')
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
            .when('/basket', {
                templateUrl: 'views/basket.html',
                controller: 'basketCtrl'
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'basketCtrl'
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
