app.controller('StopwatchController', function($scope, $timeout) {
  $scope.time = 0; // Time count in seconds

  /*
   * Primary mechanism for the stopwatch; ticks every second
   */
  function tick() {
    $scope.time++;
    $scope.timeout = $timeout(tick, 1000);
  }

  $scope.start = function() {
    tick();
  };

  $scope.stop = function() {
    $timeout.cancel($scope.timeout);
  };

  $scope.reset = function() {
    $scope.stop();
    $scope.time = 0;
    $scope.lappedTimes = [];
  };

  $scope.lappedTimes = []; // Holds all 'lapped' times
  $scope.lap = function(time) {
    $scope.lappedTimes.push(time);
  };
});
