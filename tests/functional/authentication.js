var config  = require("../../config.json"),
	randomString = require('random-string'),
	expect = require("expect.js"),
	Ajaxer = require("./utils/ajaxer");

describe("authentication suite", function(){ 	

	var ajaxer = new Ajaxer("http://localhost:3000/api");
		admin = config.admins[0];

	afterEach(function(){
		ajaxer.logout();
	});

	it("login/logout", function(done){

		ajaxer.login(admin.username, admin.password)
		.then(done)
        .fail(function(err){
            return done(err);
        });

	});		

	it("login/logout - wrong username", function(done){

		ajaxer.login(admin.username + randomString(), admin.password)
		.then(function(){
			done("login with wrong usernamed must not be performed")
		})
        .fail(function(err){
        	expect(err).to.be.ok();
            return done();
        });

	});	
	
});