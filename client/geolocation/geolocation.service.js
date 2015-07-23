(function() {
    'use strict';

    angular
        .module('msync')
        .factory('Geolocation', Geolocation);

    Geolocation.$inject = ['$q', '$window', '$rootScope'];

    function Geolocation($q, $window, $rootScope) {
        return function () {
            var deferred = $q.defer();

            if (!$window.navigator) {
                $rootScope.$apply(function() {
                    deferred.reject(new Error("Geolocation is not supported"));
                });
            } else {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    $rootScope.$apply(function() {
                        deferred.resolve(position);
                    });
                }, function (error) {
                    $rootScope.$apply(function() {
                        deferred.reject(error);
                    });
                });
            }

            return deferred.promise;
        }
    }
})();
