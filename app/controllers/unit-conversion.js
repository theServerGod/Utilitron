app.controller('UnitConversionController', function($timeout, $scope) {
  $scope.units = [
    { id: CONV_MASS, type: 'mass', symbol: 'kg', name: 'Kilograms (kg)' },
    { id: CONV_MASS, type: 'mass', symbol: 'g', name: 'Grams (g)' },
    { id: CONV_MASS, type: 'mass', symbol: 'oz', name: 'Ounces (oz)' },
    { id: CONV_MASS, type: 'mass', symbol: 'lb', name: 'Pounds (lb)' },
    { id: CONV_AREA, type: 'area', symbol: 'm2', name: 'Square metre (m^2)' },
    { id: CONV_AREA, type: 'area', symbol: 'ft2', name: 'Square foot (ft^2)' },
    { id: CONV_SPEED, type: 'speed', symbol: 'kmh', name: 'Km per hour (km/h)' },
    { id: CONV_SPEED, type: 'speed', symbol: 'mph', name: 'Miles per hour (mph)' },
    { id: CONV_LENGTH, type: 'length', symbol: 'm', name: 'Metres (m)' },
    { id: CONV_LENGTH, type: 'length', symbol: 'cm', name: 'Centimetres (cm)' },
    { id: CONV_LENGTH, type: 'length', symbol: 'yd', name: 'Yards (yd)' },
    { id: CONV_LENGTH, type: 'length', symbol: 'ft', name: 'Feet (ft)' },
    { id: CONV_LENGTH, type: 'length', symbol: 'in', name: 'Inches (in)' },
    { id: CONV_LENGTH, type: 'length', symbol: 'mi', name: 'Land miles (mi)' },
    { id: CONV_VOLUME, type: 'volume', symbol: 'l', name: 'Litre (l)' },
    { id: CONV_VOLUME, type: 'volume', symbol: 'usgal', name: 'US Gallons (gal)' },
    { id: CONV_VOLUME, type: 'volume', symbol: 'm3', name: 'Cubic metres (m^3)' },
    { id: CONV_VOLUME, type: 'volume', symbol: 'ft3', name: 'Cubic feet (ft^3)' }
  ];

  // Create group of unit types, to be used in select dropdowns in template
  $scope.types = _.uniq($scope.units, 'type');

  $scope.reset = function() {
    $scope.from = {};
    $scope.to = {};
    //$scope.unitConversionForm.$setPristine();
  };

  $scope.$watch('from', function(newVal, oldVal) {
    if (newVal && newVal.unit) {
      $scope.from.unit = _.find($scope.units, function(unit) {
        return unit.symbol === newVal.unit.symbol;
      });
      if ($scope.to.unit && checkSameType(newVal, $scope.to))
        $scope.to.value = convert(newVal.unit.id, newVal.unit.symbol, $scope.to.unit.symbol, newVal.value);
    }
  }, true);

  $scope.$watch('to', function(newVal, oldVal) {
    if (newVal && newVal.unit) {
      $scope.to.unit = _.find($scope.units, function(unit) {
        return unit.symbol === newVal.unit.symbol;
      });
      if ($scope.from.unit && checkSameType($scope.from, newVal))
        $scope.to.value = convert($scope.from.unit.id, $scope.from.unit.symbol, newVal.unit.symbol, $scope.from.value);
    }
  }, true);

  function checkSameType(from, to) {
    if (from.unit && to.unit) {
      if (from.unit.type == to.unit.type) {
        delete $scope.unitConversionForm.$error.incompat;
        return true;
      }
    }
    $scope.unitConversionForm.$error.incompat = 'Invalid: Unit types are incompatible';
    return false;
  }

  $scope.reset(); // Initialise from/to values
});
