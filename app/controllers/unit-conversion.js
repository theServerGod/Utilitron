app.controller('UnitConversionController', [
  '$timeout',
  '$scope',
function($timeout, $scope) {
  $scope.loadUnits = function() {
    $scope.units = [];
    return $timeout(function() {
      $scope.units = [
        { type: 'metric', symbol: 'mm' },
        { type: 'metric', symbol: 'cm' },
        { type: 'metric', symbol: 'm' },
        { type: 'metric', symbol: 'km'}
      ];
    });
  };
}]);
