
var Forecast = require('forecast.io-bluebird');

module.exports = function(keys) {

    var forecast = new Forecast({
        key: keys.darksky,
        timeout: 3000
    });

    function todaysForecast(lat, lng) {
        return forecast.fetch(lat, lng);
    }

    function commuteTo(lat, lng, time) {
        return forecast.fetch(lat, lng, time);
    }

    function commuteFrom(lat, lng, time) {
        return forecast.fetch(lat, lng, time);
    }

    return {
        today: todaysForecast,
        commuteTo: commuteTo,
        commuteFrom: commuteFrom
    };
}
