(function() {
    'use strict';

    angular
        .module('msync', [
            'restangular',
            'angular-skycons',
            'ngMaterial'
        ]);
})();
;(function() {
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
;(function() {
    'use strict';

    angular
        .module('msync')
        .config(RestConfig)
        .config(ThemeConfig);

    function RestConfig(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    }

    function ThemeConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('yellow');
    }
})();
;(function() {
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
;(function() {
    'use strict';

    angular
        .module('msync')
        .service('Weather', Weather);

    Weather.$inject = ['Restangular'];

    function Weather(Restangular) {
        return Restangular.service('weather');
    }
})();
;angular.module('templates-dist', ['../client/weather/weather.tpl.html']);

angular.module("../client/weather/weather.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../client/weather/weather.tpl.html",
    "<div class=\"md-primary weather-frame\" layout-align=\"center center\" ng-controller=\"WeatherController as weather\">\n" +
    "    <h2 class=\"md-toolbar-tools\" layout-margin>\n" +
    "        Weather\n" +
    "    </h2>\n" +
    "    <md-card ng-show=\"weather.showWeather()\">\n" +
    "        <div layout=\"row\" layout-align=\"center center\">\n" +
    "            <h1 ng-bind=\"weather.maxTemp\" flex=\"66\" layout-margin></h1>\n" +
    "            <div flex=\"33\" layout-align=\"center end\" layout-margin>\n" +
    "                <skycon icon=\"weather.icon\" color=\"yellow\" layout-margin></skycon>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <md-card-content>\n" +
    "            <p ng-bind=\"weather.forecast\"></p>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "    <md-progress-circular class=\"md-accent\" ng-hide=\"weather.showWeather()\" md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "</div>\n" +
    "");
}]);
