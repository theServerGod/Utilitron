var app = angular.module('app', [
	'ngMaterial',
	'ngRoute',
	'ngAnimate',
	'ngTouch',
]);

// Routes {{{
app.config([
	'$routeProvider',
	'$mdThemingProvider',
function($routeProvider, $mdThemingProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/views/home.html'
		})
		.when('/getting-started', {
			templateUrl: 'app/views/getting-started.html',
			title: 'Getting Started'
		})
		.when('/timedate/timedifference', {
			templateUrl: 'app/views/timedate/timedifference.html',
			controller: 'TimeDifferenceController',
			title: 'Time Difference'
		})
		.when('/timedate/datedifference', {
			templateUrl: 'app/views/timedate/datedifference.html',
			controller: 'DateDifferenceController',
			title: 'Date Difference'
		})
		.when('/timedate/timezone', {
			templateUrl: 'app/views/timedate/timezone.html',
			controller: 'TimezoneController',
			title: 'Timezone Finder'
		})
		.when('/unitconversion', {
			templateUrl: 'app/views/unit-conversion.html',
			controller: 'UnitConversionController',
			title: 'Unit Conversion'
		});

		// Error pages {{{
		$routeProvider
		.when('/404', {
			templateUrl: 'app/views/error/404.html',
			//title: 'Page Not Found'
		});
		// }}}

	$routeProvider.otherwise('/404');

	$mdThemingProvider.theme('dark', 'default')
		.primaryPalette('yellow')
		.dark();
}]);

// }}}
