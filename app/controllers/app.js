/**
 * Primary controller for Utilitron. Manages local storage reading/writing,
 * modal opening/closing, and other such app-wide settings and data.
 */
app.controller('AppController', function($scope, $timeout, menu, $location, $route, $rootScope, $log, $window, $animate, $anchorScroll, SITE_ROOT) {
	var self = this;

	$scope.SITE_ROOT = SITE_ROOT;

	// Expose $route var to app and child controllers - used mainly for $route.current
	$scope.$route = $route;

	// Use angular listener to close nav panel if sidenav is not fixed
	//$rootScope.$on('$locationChangeSuccess');

	/* Local storage functions {{{ */

	// Stores configuration and user data
	$rootScope.$on('saveData', saveLocalData); // Create 'saveData' event handler

	/**
	 * Initialise the application data and settings
	 */
	function init() {
		$scope.localData = { settings: {}, data: {}};
		// Default configuration, to be used if a user-defined configuration does not exist
		var defaultSettings = {
			welcomeHero: true,
		};

		// Attempt to pull in localStorage data if any, otherwise assign defaults
		$scope.localData.settings = (localStorage.length && localStorage.settings) ? JSON.parse(localStorage.settings) : defaultSettings;
		$scope.localData.data = (localStorage.length && localStorage.data) ? JSON.parse(localStorage.data) : {};

		// Attempt to retrieve locally-saved menu configuration, if present
		$scope.menu = $scope.localData.settings.menu || menu;
	}
	init(); // Immediately perform initialisation

	/**
	 * Commits the current app settings and data (held in memory) to the browser's
	 * localStorage
	 */
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

	/**
	 * Toggles the given component to an enabled (displayed) or disabled (hidden) state
	 * @param string The component to toggle
	 */
	$scope.toggle = function(component) {
		component = component || null;
		if (component) {
			switch (component) {
				case 'welcomeHero':
					if ($scope.localData.settings.welcomeHero)
						$scope.localData.settings.welcomeHero = !$scope.localData.settings.welcomeHero;
					else
						$scope.localData.settings.welcomeHero = true;
					break;
			}

			$rootScope.$emit('saveData');
		} else {
			console.error('toggle() - nothing was specified!');
		}
	};
	/* }}} */

	/* }}} */

	/**
	 * Opens or closes the specified modal.
	 * @param string modalSelector The modal to perform the action on
	 * @param string action The open or close action to perform
	 */
	$scope.modal = function(modalSelector, action) {
		var modal = $(modalSelector);
		switch (action) {
			case 'open':
				modal.openModal();
				break;
			case 'close':
				modal.closeModal();
				break;
		}
	};

	/**
	 * Moves current viewport focus to given fragment identifier
	 * @param string The fragment identifier to move focus to
	 */
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
