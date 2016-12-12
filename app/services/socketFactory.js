/**
 * Created by Dominika on 2016-12-11.
 */
angular.module('myApp')
    .factory('Socket', ['SocketPath', '$rootScope', function (SocketPath, $rootScope) {
        var socket = io.connect(SocketPath);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    }]);