define("controllers/loginController", [], function(){

	var LoginController = function ($scope, $http, $location, CryptoJS, localStorageService, InfoService) {

        $scope.failed_login = "";

        $scope.submit = function() {

            var salt = $scope.username;
            var enc_password = CryptoJS.PBKDF2($scope.password, salt, { keySize: 256/32 });

            var user = {"username": $scope.username, "password": enc_password.toString()};

            if (!$scope.username || !$scope.password) 
                return InfoService.error('Username and password are mandatory!');

            $http({ method: 'POST', url: '/api/login', data:user })
            .success(function(data, status, headers, config) {

                localStorageService.set("auth_token", data.auth_token);
                localStorageService.set("role", data.role);
                localStorageService.set("username", data.username);
                $location.path("/home");

            })
            .error(function(data, status, headers, config) {
                if (status === 401) 
                    return InfoService.error('Wrong username and/or password!');
                return InfoService.error(data);
            });   

        };    
    };

    LoginController.$inject = ['$scope', '$http','$location', 
                                'cryptoJSService','localStorageService', 'InfoService'];

	return LoginController;
});