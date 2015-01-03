var Toolbox = require('./toolbox');
var randomString = require('random-string');
var config  = require("../../config.json");

describe("authentication suite", function(){

	var admin = config.admins[0];

	beforeEach(function() {
      browser.get('http://localhost:3000/');
    });	

	it("login/logout", function(done){

		Toolbox.WelcomePage.openLoginPage();   
		Toolbox.LoginPage.login(admin.username, admin.password);
		Toolbox.NavBar.logout();

		browser.getLocationAbsUrl()
		.then(function(url){
			expect(url).toBe("/welcome");
			done();
		})

	});

	it("register user", function(done){

		var username = randomString({length: 10}),
			password = randomString();

		Toolbox.WelcomePage.openRegistrationPage();
		Toolbox.RegistrationPage.registerUser(username, password);

		Toolbox.WelcomePage.openLoginPage();   
		Toolbox.LoginPage.login(username, password);
		browser.getLocationAbsUrl()
		.then(function(url){
			expect(url).toBe("/home");
			Toolbox.NavBar.logout();
			done();
		})
		
	});

});