app.controller('AppController', [
	'$scope',
	'$mdSidenav',
	'$timeout',
	'$mdDialog',
	'menu',
	'$location',
	'$route',
	'$rootScope',
	'$log',
	'$window',
	'$mdToast',
	'$animate',
	'$anchorScroll',
function($scope, $mdSidenav, $timeout, $mdDialog, menu, $location, $route, $rootScope, $log, $window, $mdToast, $animate, $anchorScroll) {
	var self = this;

	/* Disabled for future implementation - 2015-04-26
	// Attempt to pull in localStorage data if any
	self.localData = localStorage.length ? JSON.parse(localStorage) : null;

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

	// FIXME - Quick and dirty fix for jQuery/ngMaterial issue with $mdSidenav functionality
	//if ($location.path() !== '/timedate/timezone')
	window.jQuery = null;

	// Expose $route var to app and child controllers - used mainly for $route.current
	$scope.$route = $route;
	$scope.menu = menu;

	// Used for sidebar navigation menu {{{
	$scope.path = path;
	$scope.goHome = goHome;
	$scope.openMenu = openMenu;
	$scope.toggleMenu = toggleMenu;
	$scope.closeMenu = closeMenu;
	$scope.isSectionSelected = isSectionSelected;
	$rootScope.$on('$locationChangeSuccess', openPage);
	$scope.focusMainContent = focusMainContent;

	var mainContentArea = document.querySelector("[role='main']");
	// }}}

	// Internal methods {{{
	// Methods used by menuLink and menuToggle directives {{{
	$scope.isSectionSelected = isSectionSelected;
	this.isOpen = isOpen;
	this.isSelected = isSelected;
	this.toggleOpen = toggleOpen;
	this.autoFocusContent = false;

	function isOpen(section) {
	  return menu.isSectionSelected(section);
	}

	function toggleOpen(section) {
	  menu.toggleSelectSection(section);
	}

	function isSelected(page) {
	  return menu.isPageSelected(page);
	}

	function isSectionSelected(section) {
		var selected = false;
		var openedSection = menu.openedSection;
		if (openedSection === section){
			selected = true;
		}
		else if (section.children) {
			section.children.forEach(function(childSection) {
				if (childSection === openedSection){
					selected = true;
				}
			});
		}
		return selected;
	}
	// }}}

	function closeMenu() {
	  $timeout(function() { $mdSidenav('left').close(); });
	}

	function openMenu() {
	  $timeout(function() { $mdSidenav('left').open(); });
	}

	function toggleMenu() {
		$timeout(function() { $mdSidenav('left').toggle(); });
	}

	function path() {
	  return $location.path();
	}

	function goHome($event) {
	  menu.selectPage(null, null);
	  $location.path( '/' );
	}

	function openPage() {
	  $scope.closeMenu();

	  if (self.autoFocusContent) {
	    focusMainContent();
	    self.autoFocusContent = false;
	  }
	}

	function focusMainContent($event) {
	  // prevent skip link from redirecting
	  if ($event) { $event.preventDefault(); }

	  $timeout(function(){
	    mainContentArea.focus();
	  },90);
	}
	// }}}

	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$scope.focusSection = function(section) {
		// set flag to be used later when
		// $locationChangeSuccess calls openPage()
		self.autoFocusContent = true;
	};

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

	$scope.showSettingsDialog = function($event) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    // Modal dialogs should fully cover application
	    // to prevent interaction outside of dialog
			var parentEl = angular.element(document.body);
	    $mdDialog.show({
				parent: parentEl,
				targetEvent: $event,
				template:
					'<md-dialog aria-label="List dialog">' +
					'	<md-dialog-content layout-padding>' +
					'		<md-subheader class="md-primary"><h2><i class="fa fa-cog"></i> Settings</h2></md-subheader>' +
					'		<md-divider></md-divider>' +
					'		<md-content>' +
					'			<md-button class="md-warn" ng-click="clearLocalStorage()"><i class="fa fa-trash"></i> Clear Local Settings</md-button>' +
					'		</md-content>' +
					'		<md-divider></md-divider>' +
					'  </md-dialog-content>' +
					' <div class="md-actions">' +
					'    <md-button ng-click="closeDialog()" class="md-primary">' +
					'      Close' +
					'    </md-button>' +
					'  </div>' +
					'</md-dialog>',
				locals: {
					items: $scope.items
				},
				controller: SettingsDialogController
	    });
			function SettingsDialogController(scope, $mdDialog, items) {
				scope.items = items;
				scope.closeDialog = function() {
					$mdDialog.hide();
				}

				scope.clearLocalStorage = function() {
					localStorage.clear();
					// Show toast
					$mdToast.show(
			      $mdToast.simple()
			        .content('Your settings have been cleared')
			        .position('top right')
			        .hideDelay(3000)
			    );
				}
			}
	  };

}]);
