var config  = require("../../config.json"),
	randomString = require('random-string'),
	expect = require("expect.js"),
	ToolBox = require("./utils/toolbox"),
	Ajaxer = require("./utils/ajaxer");

describe("users suite", function(){ 	

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

	it("admin deletes a user", function(done){

		var username = randomString({length: 10}),
			password = randomString();

		ToolBox.Users.createUser(ajaxer, username, password)
		.then(function(){
			return ajaxer.login(admin.username, admin.password);
		})
		.then(function(){
			return ToolBox.Users.getUsers(ajaxer);
		})
		.then(function(users){
			expect(users).to.be.ok();
			expect(users.length).to.eql(1);
			return ToolBox.Users.removeUser(ajaxer, users[0]._id);
		})
		.then(function(){
			return ToolBox.Users.getUsers(ajaxer);
		})
		.then(function(users){
			expect(users).to.be.ok();
			expect(users.length).to.eql(0);
			return done();
		})
        .fail(function(err){        	
            return done(err);
        });

	});		

	it("admin deletes a non-existent user", function(done){

		var _id = randomString({length: 10});

    	ajaxer.login(admin.username, admin.password)		
		.then(function(){
			return ToolBox.Users.removeUser(ajaxer, _id);
		})
		.then(function(){
			done("non-existing user must not be removeed")
		})		
        .fail(function(err){        	
            return done();
        });

	});		

	it("user deletes a user", function(done){

		var username = randomString({length: 10}),
			password = randomString(),
			_user;

		ToolBox.Users.createUser(ajaxer, username, password)
		.then(function(){
			return ajaxer.login(admin.username, admin.password);
		})
		.then(function(){
			return ToolBox.Users.getUsers(ajaxer);
		})
		.then(function(users){
			expect(users).to.be.ok();
			expect(users.length).to.eql(1);
			_user = users[0];
			return ajaxer.logout();
		})
		.then(function(){
			return ajaxer.login(username, password);
		})
		.then(function(users){
			return ToolBox.Users.removeUser(ajaxer, _user._id);
		})
		.then(function(){
			return done("user must not remove user");
		})
        .fail(function(err){  
            return done();
        });

	});		

});