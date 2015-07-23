
var config = require('./config/config');
var express = require('express');
var path = require('path');
var app = require('./server/server')(config);

app.use(express.static(__dirname));

app.get('/reciever', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(config.port, config.host, function() {
    console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
});
