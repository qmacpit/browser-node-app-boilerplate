
define("app", [
    'angular',
    'angularRoute',
    'angularLocalStorage',
    'controllers',
    'services'

], function (angular) {
    'use strict';

    var mainApp =  angular.module('mainApp', [
        'LocalStorageModule',
        'ngRoute',
        'myAppServices',
        'mainAppControllers'
    ]);

    mainApp.config(['$httpProvider',function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    }]);


    mainApp.config(['$routeProvider',
        function($routeProvider) {

            $routeProvider.
                when('/login', {
                    templateUrl: 'partials/login',
                    controller: 'LoginCtrl',
                    access: { requiredLogin: false }
                })
                .when('/register', {
                    templateUrl: 'partials/register',
                    controller: 'RegistrationCtrl',
                    access: { requiredLogin: false }
                })
                .when('/home', {
                    templateUrl: 'partials/auth/home',
                    controller: 'HomeCtrl',
                    access: { requiredLogin: true }
                })
                .when('/person', {
                    templateUrl: 'partials/auth/person',
                    controller: 'PersonCtrl',
                    access: { requiredLogin: true }
                })
                .when('/users', {
                    templateUrl: 'partials/auth/users',
                    controller: 'UserCtrl',
                    access: { requiredLogin: true }
                })
                .when('/welcome', {
                    templateUrl: 'partials/welcome',
                    access: { requiredLogin: false }
                })
                .when('/settings', {
                    templateUrl: 'partials/auth/settings',
                    controller: 'SettingsCtrl',
                    access: { requiredLogin: true }
                })
                .otherwise({
                    redirectTo: '/welcome'
                });
        }

    ]);


    mainApp.run(['$rootScope','$location','AuthenticationService',function($rootScope, $location, AuthenticationService) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {

            if (!nextRoute.access) {
                $location.path("/welcome");
            }else if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged()) {
                $location.path("/welcome");
            }else if (AuthenticationService.isLogged() && !nextRoute.access.requiredLogin) {
                $location.path("/home");
            }
        });
    }]);

    return mainApp;


});




