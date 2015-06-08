app.controller('DictionaryController', function($scope) {
  var self = this;

  $scope.reset = function() {
    $scope.searchText = null;
  };
});
