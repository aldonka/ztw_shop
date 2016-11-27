/**
 * Created by Dominika on 2016-11-27.
 */
angular.module('myApp')
    .value('UsersLoc', '/users')
    .factory('User', ['$resource', 'Path', 'UsersLoc', function ($resource, Path, UsersLoc) {
        return $resource(Path + UsersLoc, {}, {
            get: {
                method: 'GET',
                isArray: true
            },
            logAsAdmin: {
                method: 'POST',
                url: Path + UsersLoc + '/login',
                params : {
                    withCredentials: true
                }
            }
        });

    }])
    .service('SessionService', ['$rootScope', '$location', 'User', function ($rootScope, $location, User) {
        return {
            isAdmin: function () {
                if($rootScope.adminLogged){
                    $rootScope.isAdmin = true;
                }else{
                    console.log(" Console: " + ($location.url() == '/console') + " path: " + $location.url());
                    $rootScope.isAdmin = $location.url() == '/console';
                }

            },
            logInAdmin: function () {
                User.logAsAdmin({username: $rootScope.username, password: $rootScope.password}, function (response) {
                    console.log("Logged as Admin!Hurrey!");
                    $rootScope.username = '';
                    $rootScope.password = '';
                    $rootScope.adminLogged = true;

                }, function (error) {
                    console.log("You are not admin...");
                })
            }
        }
    }]);