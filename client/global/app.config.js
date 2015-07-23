(function() {
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
