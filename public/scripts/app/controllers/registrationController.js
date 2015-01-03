define("controllers/registrationController", [], function(){

	var RegistrationController = function ($scope, $http, $location, CryptoJS, InfoService) {

        $scope.signup = function()
        {
            var salt = $scope.username;

            var enc_password = CryptoJS.PBKDF2($scope.password, salt, { keySize: 256/32 });
            var enc_check_password = CryptoJS.PBKDF2($scope.check_password, salt, { keySize: 256/32 });

            var user = {
                "username": $scope.username, 
                "password": enc_password.toString(), 
                "check_password" : enc_check_password.toString() 
             };

            if ($scope.username && $scope.password && $scope.check_password) {

                if ($scope.password !== $scope.check_password)                     
                    return InfoService.error("password and check_password must be the same!")

                $http({method: 'POST', url: '/api/signup', data:user})
                .success(function(data, status, headers, config) {
                        $scope.username = null;
                        $scope.password = null;
                        $scope.check_password = null;

                        $location.path("/welcome");
                    })
                .error(function(data, status, headers, config) {
                    InfoService.error(data);                    
                });

            } else {
                InfoService.error("Username and password are mandatory!");    
            }
        }
    }

    RegistrationController.$inject = ['$scope', '$http', '$location', "cryptoJSService", "InfoService"];

	return RegistrationController;
});