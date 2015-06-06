/**
 * Utilitron angular code
 */

var app = angular.module('app', [
	'ngRoute',
	'ngAnimate',
	'ngTouch',
	'ui.calendar',
]);

app.constant('SITE_ROOT', function() {
	// Use the hostname to determine which <base> url to set
	if (window.location.hostname === 'theservergod.github.io')
		return 'http://theservergod.github.io/Utilitron/';
	else
		return '/'; // development base URI
}()); // Use () to immediately run the function and obtain the result
