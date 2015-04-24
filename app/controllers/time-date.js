// TimeDifference {{{
app.controller('TimeDifferenceController', [
  '$scope',
function($scope) {
  var self = this;

  $scope.time = {};

  function initTimes() {
    $scope.time.start = new Date(moment().set('seconds', 0).set('milliseconds', 0));
    $scope.time.end = new Date(moment($scope.time.start).add(1, 'hours'));
  }

  function calcTimeDiff(start, end) {
    if (start && end) {
      var diff = {};
      start = moment(start);
      end = moment(end);
      diff.sec = end.diff(start, 'seconds');
      diff.min = end.diff(start, 'minutes');
      diff.hrs = end.diff(start, 'hours', true);
      diff.text = Math.floor(diff.hrs) + ' hours, ' + (diff.min - (Math.floor(diff.hrs)*60)) + ' minutes, ' + (diff.sec - (diff.min*60)) + ' seconds';
      return diff;
    } else
      return null;
  }

  $scope.$watch('time', function(newValue, oldValue) {
    //if ($scope.time.end < $scope.time.start)
    //  $scope.time.end = $scope.time.start;

    $scope.time.difference = calcTimeDiff($scope.time.start, $scope.time.end);
  }, true);


  initTimes();
}]);
// }}}
// DateDifference {{{
app.controller('DateDifferenceController', [
  '$scope',
function($scope) {

}]);
// }}}
// Timezone {{{
app.controller('TimezoneController', [
  '$scope',
function($scope) {

}]);
// }}}
