// Routes {{{
app.config(function($routeProvider) {
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
		.when('/timedate/calendar', {
			templateUrl: 'app/views/timedate/calendar.html',
			controller: 'CalendarController',
			title: 'Calendar'
		})
		.when('/timedate/stopwatch', {
			templateUrl: 'app/views/timedate/stopwatch.html',
			controller: 'StopwatchController',
			title: 'Stopwatch'
		})
		.when('/unitconversion', {
			templateUrl: 'app/views/unit-conversion.html',
			controller: 'UnitConversionController',
			title: 'Unit Conversion'
		})
		.when('/calculator', {
			templateUrl: 'app/views/calculator.html',
			controller: 'CalculatorController',
			title: 'Calculator'
		})
		.when('/language/dictionary', {
			templateUrl: 'app/views/language/dictionary.html',
			controller: 'DictionaryController',
			title: 'Dictionary'
		})
		.when('/astronomy/telescopecalculator', {
			templateUrl: 'app/views/astronomy/telescope-calculator.html',
			controller: 'TelescopeCalculatorController',
			title: 'Telescope Calculator'
		})
		.when('/document/notes', {
			templateUrl: 'app/views/document/notes.html',
			controller: 'NotesController',
			title: 'Notes'
		});

	// Error pages {{{
	$routeProvider
		.when('/404', {
			templateUrl: 'app/views/error/404.html',
			//title: 'Page Not Found'
		});
	// }}}

	// Redirect to 'page not found' message
	$routeProvider.otherwise('/404');
});

// }}}
