app.controller('DictionaryController', function($timeout, $scope, $mdDialog, $mdToast, $animate) {
  var self = this;
  self.words = loadAll();
  $scope.useUtilitronDict = parseSettings();

  /*
   * Parse localStorage flag settings into booleans, so ng-model can properly check/uncheck applicable checkbox elements
   */
  function parseSettings() {
    if (localStorage.useUtilitronDict) {
      switch (localStorage.useUtilitronDict) {
        case 'true':
          return true;
          break;
        case 'false':
          return false;
          break;
      }
    } else {
      return true; // Default setting is true
    }
  }

  function loadAll() {
    return {
      // Dictionary is in key-value pairs of an object {}
      'word': 'definition',
    };
  }

  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('Feature Under Development')
        .content('This feature is currently under development, stay tuned!')
        .ariaLabel('Under Development')
        .ok('Okay')
        .targetEvent(ev)
    );
  };

  $scope.showSavedToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .content('Your settings have been saved locally')
        .position('top right')
        .hideDelay(3000)
    );
  };

  $scope.$watch('useUtilitronDict', function(newVal, oldVal) {
    localStorage.useUtilitronDict = newVal; // Persist the choice to local storage
  });
});
