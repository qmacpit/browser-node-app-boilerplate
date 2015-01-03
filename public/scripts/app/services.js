define("services", ['angular','noty', 'cryptojslib'], function (angular,noty) {
    'use strict';

    var myAppServices = angular.module('myAppServices', []);

    myAppServices.service('TokenInterceptor',['$q','$location','localStorageService',
        function ($q, $location, localStorageService)
        {
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    if(localStorageService.get("auth_token")!==null)
                        config.headers.Authorization = 'Bearer '+ localStorageService.get("auth_token");

                    return config;
                },

                response: function (response) {
                    return response || $q.when(response);
                },
                responseError : function (response) {

                    if(response.config.url!=="/api/login" && response.status===401){
                        localStorageService.clearAll();
                        $location.path("/login");
                    }

                    return $q.reject(response);

                }
            };
        }]);

    myAppServices.service('cryptoJSService',
        function(){
        return CryptoJS;
    })

    myAppServices.service('InfoService',
        function(){
        return {
            success: function(msg) {

            },
            error: function(msg) {                
                window.noty({
                    text: msg,  
                    timeout: 2000, 
                    type: 'error'
                });
            }
        };
    })

    myAppServices.service('AuthenticationService',['localStorageService',function(localStorageService){
        return {
            isLogged: function()
            {
                //TODO: great piece of code
                var authenticated = false;
                if(localStorageService.get("auth_token")!==null)
                    authenticated = true;

                return authenticated;
            },
            isUser: function(role){
                return localStorageService.get("role") === role;
            },
            getUserData: function() {
                return {
                    username: localStorageService.get("username") 
                }
            }
        }
    }])

    return myAppServices;
});




