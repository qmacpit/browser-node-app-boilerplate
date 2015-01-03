define("controllers/settingsController", [], function(){

	var SettingsController = function ($scope, $http, CryptoJS, AuthenticationService, InfoService) {

        $scope.changePassword = function() {
            console.log(AuthenticationService.getUserData());

            if ($scope.newPassword1 !== $scope.newPassword2)
                return console.log("passwords have to be the same")

            var salt = AuthenticationService.getUserData().username;

            if (!salt)
                return console.log("username empty")                
           
            var passwordData = {
                "oldPassword": CryptoJS.PBKDF2($scope.oldPassword, salt, { keySize: 256/32 }).toString(), 
                "newPassword1": CryptoJS.PBKDF2($scope.newPassword1, salt, { keySize: 256/32 }).toString(), 
                "newPassword2" : CryptoJS.PBKDF2($scope.newPassword2, salt, { keySize: 256/32 }).toString()
            };
        
            $http({ method: 'POST', url: '/api/changePassword', data:passwordData })
            .success(function(data, status, headers, config) {
                $scope.oldPassword = null;
                $scope.newPassowrd1 = null;
                $scope.newPassowrd2 = null;
            })
            .error(function(data, status, headers, config) {
                InfoService.error(data.message);                
            });
        };
    }

    SettingsController.$inject = ['$scope', '$http', "cryptoJSService", 'AuthenticationService', 'InfoService'];

	return SettingsController;
});