app.controller('UnitConversionController', [
  '$timeout',
  '$scope',
function($timeout, $scope) {
  $scope.from = {};
  $scope.to = {};

  $scope.conversionLookup = {
    metric: {
      mm: 1,
      cm: 10,
      m: 1000
    }
  };

  $scope.loadUnits = function() {
    $scope.units = [];
    return $timeout(function() {
      $scope.units = [
        { type: 'metric', symbol: 'mm' },
        { type: 'metric', symbol: 'cm' },
        { type: 'metric', symbol: 'm' },
        { type: 'metric', symbol: 'km' }
      ];
    });
  };

  $scope.$watch('from', function(newVal, oldVal) {
    if (newVal && newVal.unit && $scope.to.unit)
      $scope.to.value = calcVal(newVal, $scope.to);
  }, true);

  $scope.$watch('to', function(newVal, oldVal) {
    if (newVal && newVal.unit && $scope.from.unit)
      newVal.value = calcVal($scope.from, newVal);
  }, true);

  // FIXME - stub
  function calcVal(from, to) {
    /*if (from.unit != to.unit)
      from.value = convertTo(from, to);
    return from.value * $scope.conversionLookup.metric[to.unit.symbol]; */
  }


}]);
