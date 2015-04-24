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
function($scope, $mdSidenav, $timeout, $mdDialog, menu, $location, $route, $rootScope, $log) {
	var self = this;

	// Expose $route var to app and child controllers - used mainly for $route.current
	$scope.$route = $route;
	$scope.menu = menu;

	// Used for sidebar navigation menu {{{
	$scope.path = path;
	$scope.goHome = goHome;
	$scope.openMenu = openMenu;
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

}]);
