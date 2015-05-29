app.controller('AppController', function($scope, $timeout, menu, $location, $route, $rootScope, $log, $window, $animate, $anchorScroll) {
	var self = this;

	/* Disabled for future implementation - 2015-04-26
	// Development mode - for easier switching of <base> element in index {{{
	$scope.SHOW_DEV_SETTINGS = true; // Show development settings in the UI
	$scope.DEV_MODE = (self.localData && self.localData.settings.devMode) ? !!self.localData.settings.devMode : false;
	*/

	$scope.DEV_MODE = false;

	if (!$scope.DEV_MODE)
		$scope.SITE_ROOT = 'http://theservergod.github.io/Utilitron/'; // FIXME - Add this as a proper constant
	else
		$scope.SITE_ROOT = '/'; // development base URI
	// }}}

	// Expose $route var to app and child controllers - used mainly for $route.current
	$scope.$route = $route;
	$scope.menu = menu;

	// Use angular listener to close nav panel if sidenav is not fixed
	//$rootScope.$on('$locationChangeSuccess');

	/* Local storage functions {{{ */

	// Stores configuration and user data
	$scope.localData = { settings: {}, data: {}};
	// Default configuration, to be used if a user-defined configuration does not exist
	var defaultSettings = {
		welcomeHero: true,
	};

	// Attempt to pull in localStorage data if any, otherwise assign defaults
	$scope.localData.settings = (localStorage.length && localStorage.settings) ? JSON.parse(localStorage.settings) : defaultSettings;
	$scope.localData.data = (localStorage.length && localStorage.data) ? JSON.parse(localStorage.data) : {};
	$rootScope.$on('saveData', saveLocalData); // Create 'saveData' handler

	function saveLocalData() {
		localStorage.settings = JSON.stringify($scope.localData.settings);
		//localStorage.data = JSON.stringify($scope.localData.data);
	}

	$scope.clearLocalStorage = function() {
		if (confirm('This will delete ALL your locally saved data and settings.\n\nAre you sure?')) {
			localStorage.clear();
			Materialize.toast('Local storage cleared. Page will reload in 4 seconds', 4000);
			$timeout(function() { window.location.reload(); }, 4000);
		}
	};

	/* Settings functions {{{ */
	$scope.toggleWelcomeHero = function() {
		if ($scope.localData.settings.welcomeHero)
			$scope.localData.settings.welcomeHero = !$scope.localData.settings.welcomeHero;
		else
			$scope.localData.settings.welcomeHero = true;

		$rootScope.$emit('saveData');
	};
	/* }}} */

	/* }}} */

	$scope.openModal = function(modalSelector) {
		$(modalSelector).openModal();
	};

	$scope.closeModal = function(modalSelector) {
		$(modalSelector).closeModal();
	}

	$scope.gotoAnchor = function(x) {
		var newHash = 'anchor-' + x;
		if ($location.hash() !== newHash) {
			// set the $location.hash to `newHash` and
			// $anchorScroll will automatically scroll to it
			$location.hash('anchor-' + x);
		} else {
			// call $anchorScroll() explicitly,
			// since $location.hash hasn't changed
			$anchorScroll();
		}
	};

});
