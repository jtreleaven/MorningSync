(function() {
    'use strict';

    angular
        .module('msync', [
            'restangular',
            'ui-router'
        ])
        .config(function(RestangularProvider, ) {
            RestangularProvider.setBaseUrl('/api');
        });
})();
;(function() {
    'use strict';

    angular
        .module('msync')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['Weather'];

    function WeatherController(Weather) {
        var vm = this;
        vm.forecast = "";
        Weather.one('35.163119,-80.899611').get()
            .then(function(result) {
                vm.forecast = result;
            }, function(err) {
                console.error(err);
            });
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
    "<div class=\"mdl-card\" ng-controller=\"WeatherController as weather\">\n" +
    "    <div class=\"mdl-card__title\">\n" +
    "        <!-- Title stuff goes here -->\n" +
    "    </div>\n" +
    "    <div class=\"mdl-card__actions\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
