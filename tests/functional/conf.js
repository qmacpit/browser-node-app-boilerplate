// Karma configuration
// Generated on Fri Dec 05 2014 20:05:51 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [ 
        {pattern: 'public/scripts/lib/angular/angular.min.js', included: false},
        {pattern: 'public/scripts/lib/angular-local-storage/dist/angular-local-storage.min.js', included: false},
        {pattern: 'public/scripts/lib/angular-mocks/angular-mocks.js', included: false},
        {pattern: 'public/scripts/lib/angular-route/angular-route.min.js', included: false},
        {pattern: 'public/scripts/lib/cryptojslib/rollups/pbkdf2.js', included: false},
        {pattern: 'public/scripts/lib/jquery/dist/jquery.min.js', included: false},
        {pattern: 'public/scripts/lib/noty/js/noty/jquery.noty.js', included: false},
        {pattern: 'public/scripts/lib/noty/js/noty/themes/default.js', included: false},
        {pattern: 'public/scripts/lib/noty/js/noty/layouts/top.js', included: false},
        {pattern: 'public/scripts/lib/bootstrap/dist/js/bootstrap.min.js', included: false},
        {pattern: 'public/scripts/app/**/*.js', included: false},
        // {pattern: 'public/scripts/lib/**/*.js', included: false},
        // {pattern: 'public/scripts/app/**/*.js', included: false},
        {pattern: 'tests/functional/authenticationSpec.js', included: false},
        'tests/functional/main-functional.js'
        // 'tests/functional/*Spec.js'            
    ],


    // list of files to exclude
    exclude: [
        'public/scripts/webapp.min.js',
        'public/scripts/main.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // plugins : [
    //     'karma-jasmine'
    // ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
