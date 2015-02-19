var morgan = require('morgan'),
	express = require('express'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	errorhandler = require('errorhandler'),
	path = require('path');

module.exports = function(app) {

    app.use(morgan('combined')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
    app.set('view engine', 'html'); // set up html for templating
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));    
    app.use(methodOverride());
    app.use(passport.initialize());

    // development only
	if (app.get('env') === 'development') {
	    app.use(errorhandler());
	};

	// production only
	if (app.get('env') === 'production') {
	    // TODO
	};
};