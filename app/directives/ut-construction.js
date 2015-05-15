/*
 * Wrap the given HTML content in an 'under construction' element
 */
app.directive('utConstruction', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'app/partials/ut-construction.tmpl.html'
  };
});
