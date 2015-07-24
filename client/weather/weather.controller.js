(function() {
    'use strict';

    angular
        .module('msync')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['Weather', 'Geolocation'];

    function WeatherController(Weather, Geolocation) {
        var vm = this;
        vm.loaded = false;
        vm.forecast = "";

        vm.showWeather = isWeatherLoaded;

        Geolocation().then(function(loc) {
            let geo = loc.coords.latitude + "," + loc.coords.longitude;
            Weather.one(geo).get()
                .then(function(result) {
                    vm.forecast = result.summary;
                    vm.maxTemp = result.temperatureMax;
                    vm.maxTempTime = result.temperatureMaxTime;
                    vm.icon = result.icon;
                    vm.loaded = true;
                }, function(err) {
                    console.error(err);
                });
        }, function(reason) {
            console.error(reason);
        });

        function isWeatherLoaded() {
            return vm.loaded;
        }
    }
})();
