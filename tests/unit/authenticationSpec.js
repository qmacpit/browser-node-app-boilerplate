define([
	'angular', 'angularMocks', "controllers", 'cryptojslib'], function (angular, mock ,app, cryptojslib) {

	describe("authentication suite", function(){

	 	var scope, ctrl, httpBackend;
		
		beforeEach(function(done){			
			mock.module("mainAppControllers");
			inject(function($controller, $httpBackend) {
		      scope = {};
		      httpBackend = $httpBackend;
		      ctrl = $controller('RegistrationCtrl', {
		      	$scope:scope,
		      	cryptoJSService: CryptoJS
		      });
		      done();
		    })
		});	

		it("login/logout", function(){
			scope.username = "macpit1";
			scope.password = "ppp";
			scope.check_password = "ppp";
			httpBackend.expectPOST('/api/signup').respond(201, '');;
			scope.signup();
			httpBackend.flush();
		});		
		
	});
});