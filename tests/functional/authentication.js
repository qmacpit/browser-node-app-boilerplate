var config  = require("../../config.json"),
	randomString = require('random-string'),
	expect = require("expect.js"),
	ToolBox = require("./utils/toolbox"),
	Ajaxer = require("./utils/ajaxer");

describe("authentication suite", function(){ 	

	var ajaxer = new Ajaxer("http://localhost:3000/api");
		admin = config.admins[0];

	afterEach(function(){
		ajaxer.logout();
	});

	after(function(done){
		ajaxer.login(admin.username, admin.password)
		.then(function(){			
			return ToolBox.Users.removeUsers(ajaxer);			
		})
		.then(function(){
			return done();
		});
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

	it("login/logout - wrong password", function(done){

		ajaxer.login(admin.username, admin.password + randomString())
		.then(function(){
			done("login with wrong usernamed must not be performed")
		})
        .fail(function(err){
        	expect(err).to.be.ok();
            return done();
        });

	});

	it("create user", function(done){

		var username = randomString({length: 10}),
			password = randomString();

		ToolBox.Users.createUser(ajaxer, username, password)
		.then(function(){
			return ajaxer.login(username, password);
		})
		.then(function(){
			done();
		})
        .fail(function(err){        	
            return done(err);
        });

	});	

	it("create user - username already exists", function(done){

		var username = randomString({length: 10}),
			password = randomString();

		ToolBox.Users.createUser(ajaxer, username, password)
		.then(function(){
			return ToolBox.Users.createUser(ajaxer, username, password);
		})
		.then(function(){
			done("creating user with existing username must not be permitted");
		})
        .fail(function(err){     
        	expect(err).to.be.ok(); 	
            return done();
        });

	});	
	
});