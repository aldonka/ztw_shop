'use strict';
angular.module('myApp', [
  'ngRoute', 'ngResource', 'ngAnimate', 'ngCookies'
]).
config([ '$routeProvider', function( $routeProvider) {
  $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
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
