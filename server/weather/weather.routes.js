'use strict';

var weather = require('./weather.controller');

module.exports = function(app) {

    app.route('/api/weather/:geoPts').get(weather.getTodaysWeather);
    app.route('/api/weather/:geoPts/commute/to').get(weather.getCommuteTo);
    app.route('/api/weather/:geoPts/commute/from').get(weather.getCommuteFrom);

};
