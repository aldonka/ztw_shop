'use strict';
angular.module('myApp', [
  'ngRoute', 'ngResource', 'ngAnimate', 'ngCookies'
])
    .value('Path', 'http://localhost:2403')
    .config([ '$routeProvider', function( $routeProvider) {
  $routeProvider
      .when('/main', {
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
      .otherwise({
        redirectTo: '/main'
      });
}]);
