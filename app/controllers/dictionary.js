app.controller('DictionaryController', function($timeout, $scope, $animate) {
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

  $scope.$watch('useUtilitronDict', function(newVal, oldVal) {
    localStorage.useUtilitronDict = newVal; // Persist the choice to local storage
  });
});
