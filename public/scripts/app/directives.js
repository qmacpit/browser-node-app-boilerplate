define("directives", ['angular'], function (angular) {
	'use strict';

	/* Directives */
	angular.module('myApp.directives', []).
	  directive('appVersion', ['version', function(version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
	  }]);
});