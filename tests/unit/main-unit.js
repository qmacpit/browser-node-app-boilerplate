var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
    baseUrl: '/base/public/scripts/lib',
    paths :{
        'app' : '../app/app',
        'controllers' : '../app/controllers',
        'services' : '../app/services',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
        'angularMocks' : 'angular-mocks/angular-mocks',
        'angularLocalStorage' : 'angular-local-storage/dist/angular-local-storage.min',
        'cryptojslib' : 'cryptojslib/rollups/pbkdf2',
        'jquery' : 'jquery/dist/jquery.min',
        'noty': 'noty/js/noty/jquery.noty',
        'noty.themes.default': 'noty/js/noty/themes/default',
        'noty.layouts.top': 'noty/js/noty/layouts/top',
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
        'angularMocks' :{
            deps: ['angular'],
            exports : 'angular.mock'
        },
        'angularLocalStorage' :{
            deps: ['angular'],
            exports : 'angularLocalStorage'
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'jquery' : {
            exports : 'jquery'
        },
        'noty': ['jquery'],
        'noty.themes.default': {
            deps: ['jquery', 'noty'],
            exports: 'jquery'
        },
        'noty.layouts.top': {
            deps: ['jquery', 'noty'],
            exports: 'jquery'
        },
        'bootstrap' : ['jquery']
    },
    deps: tests,  // add tests array to load our tests
    callback: window.__karma__.start // start tests once Require.js is done
});
