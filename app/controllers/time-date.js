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
      diff.text = humanizeTimeDiff(diff.hrs, diff.min, diff.sec);
      return diff;
    } else
      return null;
  }

  /* Given total time difference as hours, minutes, and seconds output human-readable string with correct plurality */
  function humanizeTimeDiff(hrs, min, sec) {
    // Calculate the time as a combined format
    var h = Math.floor(hrs);
    var m = (min - (hrs*60));
    var s = (sec - (min*60));
    return h + (h === 1 ? ' hour, ' : ' hours, ') + m + (m === 1 ? ' minute, ' : ' minutes, ') + s + (s === 1 ? ' second' : ' seconds');
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
  var self = this;
  $scope.date = {};

  function initDates() {
    $scope.date.start = new Date(moment().set('hours', 0).set('minutes', 0).set('seconds', 0).set('milliseconds', 0));
    $scope.date.end = $scope.date.start;
  }

  function calcDateDiff(start, end) {
    if (start && end) {
      var diff = {};
      start = moment(start);
      end = moment(end);
      diff.years = end.diff(start, 'years', true);
      diff.months = end.diff(start, 'months', true);
      diff.days = end.diff(start, 'days');
      diff.text = moment(end).from(moment(start), true) === 'a few seconds' ? null : moment(end).from(moment(start), true);
      return diff;
    } else
      return null;
  }

  $scope.$watch('date', function(newValue, oldValue) {
    $scope.date.diff = calcDateDiff(newValue.start, newValue.end);
  }, true);

  initDates();
}]);
// }}}
// Timezone {{{
app.controller('TimezoneController', [
  '$scope',
function($scope) {

}]);
// }}}
