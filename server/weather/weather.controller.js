'use strict';

var gtz = require('node-google-timezone');

exports.getTodaysWeather = function(req, res) {
    var pts = req.params.geoPts;
    var lat = pts.split(',')[0];
    var lng = pts.split(',')[1];

    var darksky = require('./darksky')(req.keys);
    darksky.today(lat, lng)
        .then(function(result) {
            res.send(result.daily.data[0]);
            return;
        }).catch(function(error) {
            res.error(error);
            return;
        });
};

exports.getCommuteTo = function(req, res) {
    var pts = req.params.geoPts;
    var lat = pts.split(',')[0];
    var lng = pts.split(',')[1];

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();

    var commuteTime = new Date(year, month, day, 8, 30, 0);

    var darksky = require('./darksky')(req.keys);
    darksky.commuteTo(lat, lng, commuteTime.getTime())
        .then(function(result) {
            res.send(result.currently);
            return;
        }).catch(function(error) {
            res.error(error);
            return;
        });
};

exports.getCommuteFrom = function(req, res) {
    var pts = req.params.geoPts;
    var lat = pts.split(',')[0];
    var lng = pts.split(',')[1];

    // based on commute of around 5 to 6
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();

    var commuteTime = new Date(year, month, day, 17, 30, 0);

    var darksky = require('./darksky')(req.keys);
    darksky.commuteFrom(lat, lng, commuteTime.getTime())
        .then(function(result) {
            res.send(result.currently);
            return;
        }).catch(function(error) {
            res.error(error);
            return;
        });
};
