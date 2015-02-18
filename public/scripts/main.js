require.config({
    baseUrl: 'scripts/lib',
    paths :{
        'app' : '../app/app',
        'controllers' : '../app/controllers',
        'services' : '../app/services',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
        'angularLocalStorage' : 'angular-local-storage/dist/angular-local-storage.min',
        'cryptojslib' : 'cryptojslib/rollups/pbkdf2',
        'jquery' : 'jquery/dist/jquery.min',
        'toastr': 'toastr/toastr.min',
        'bootstrap' : 'bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular'],
            exports : 'angularRoute'
        },
        'angularLocalStorage' :{
            deps: ['angular'],
            exports : 'angularLocalStorage'
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'toastr': {
            exports : 'toastr'  
        },
        'bootstrap' : ['jquery']
    }
});


require([
    'require', 'angular', 'angularRoute', 'angularLocalStorage', 
    'cryptojslib', 'toastr', 'bootstrap','app'], 
    function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['mainApp']);
    });
});