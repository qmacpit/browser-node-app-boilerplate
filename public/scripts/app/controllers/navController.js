define("controllers/navController", [], function(){

	var NavController = function($scope, $http, $location, localStorageService, AuthenticationService) {

        $scope.isAuthenticated = AuthenticationService.isLogged()

        $scope.logout = function()
        {
            localStorageService.clearAll();
            $location.path("/login");
        }
    }

    NavController.$inject = ['$scope', '$http', '$location', 'localStorageService', 'AuthenticationService'];

	return NavController;
});