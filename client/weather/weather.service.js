(function() {
    'use strict';

    angular
        .module('msync')
        .service('Weather', Weather);

    Weather.$inject = ['Restangular'];

    function Weather(Restangular) {
        return Restangular.service('weather');
    }
})();
