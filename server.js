/**
 * Module dependencies
*/
var express  = require('express'),
    passport = require('passport'),
    UserDao = require('./datastore/userDao');

var port = process.env.PORT || 3000,
    ip = process.env.IP || "localhost",
    config,
    app = express();

try {
    config = require("./config.json");
} catch (e) {
    console.log("config.json not provided");
}

require("./appConfig")(app);

require('./config/database')(function(){
    require('./config/passport')(passport); 
    require('./app/routes.js')(app, passport); 
    _performApplicationStartup(config)
});

var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
});

function _performApplicationStartup (_config, callback) {
    if (!_config)
        callback();

    for (var i = 0, current; i < _config.admins.length; i++)
        current = _config.admins[i];
        current.role = "admin";
        UserDao.createAndHashUser(current)
        .onReject(function(err){
            console.error("creating admin failed")
            console.error(err)
        });
}