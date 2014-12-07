var Toolbox = require('./toolbox');
var randomString = require('random-string');

describe("authentication suite", function(){

	beforeEach(function() {
      browser.get('http://localhost:3000/');
    });	

	it("login/logout", function(){
		Toolbox.NavBar.logIn("macpit", "ppp");
		expect(Toolbox.NavBar.getNavBarElements().last().getAttribute("class")).not.toBe("ng-hide");
		Toolbox.NavBar.logout();
		expect(Toolbox.NavBar.getNavBarElements().last().getAttribute("class")).toBe("ng-hide");
	});

	it("register user", function(){
		var username = randomString({length: 10}),
			password = randomString();

		Toolbox.NavBar.register(username, password);		
		Toolbox.NavBar.logIn(username, password);
		expect(Toolbox.NavBar.getNavBarElements().last().getAttribute("class")).not.toBe("ng-hide");
		Toolbox.NavBar.logout();
		expect(Toolbox.NavBar.getNavBarElements().last().getAttribute("class")).toBe("ng-hide");
	});

});