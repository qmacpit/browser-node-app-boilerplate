define("controllers/navController", [], function(){

	var NavController = function($scope, $http, $location, localStorageService, AuthenticationService) {

        $scope.isAuthenticated = AuthenticationService.isLogged()

        $scope.isAdmin = AuthenticationService.isUser("admin");    

        $scope.userData = AuthenticationService.getUserData();   

        $scope.logout = function()
        {
            localStorageService.clearAll();
            $location.path("/welcome");
        }

        $scope.removeUsers = function()
        {
            $http({method: 'DELETE', url: '/api/users'})
            .success(function(data, status, headers, config) {
                console.log("users deleted");
            })
            .error(function(data, status, headers, config) {
                console.log("users not deleted");
            });
        }
    }

    NavController.$inject = ['$scope', '$http', '$location', 'localStorageService', 'AuthenticationService'];

	return NavController;
});