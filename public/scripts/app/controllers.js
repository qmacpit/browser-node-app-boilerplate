define("controllers", 
    ['angular', 'services', "controllers/navController", "controllers/loginController",
    "controllers/userController", "controllers/settingsController", "controllers/registrationController"], 
    function (angular, services, NavController, LoginController, UserController, SettingsController,
        RegistrationController) {
    'use strict';

    var mainAppControllers = angular.module('mainAppControllers', []);

    mainAppControllers.controller('NavCtrl', NavController);
    mainAppControllers.controller('LoginCtrl', LoginController);
    mainAppControllers.controller('UserCtrl', UserController);
    mainAppControllers.controller('SettingsCtrl', SettingsController);
    mainAppControllers.controller('RegistrationCtrl', RegistrationController);

    
    mainAppControllers.controller('HomeCtrl', ['$scope', '$http',
        function ($scope, $http) {}
    ]);
    
    return mainAppControllers;
});





