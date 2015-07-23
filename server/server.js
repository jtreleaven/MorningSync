'use strict';

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(config) {

    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    /*
     *  This middleware binds the necessary api keys to the
     *  req objects, so that the entire config object doesn't
     *  need to be required everywhere.
     */
    app.use(function(req, res, next) {
        req.keys = {
            darksky: config.darksky_key,
            gapi: config.gapi_key
        };
        next();
    });

    require('../server/weather/weather.routes')(app);

    return app;
};
