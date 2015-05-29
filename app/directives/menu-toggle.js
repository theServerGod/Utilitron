/**
 * Directive may implemented to be called as an attribute of an element
 * E.g. `<ul menu-toggle class="collapsible" data-collapsible="expandable">`
 */

app.directive('menuToggle', function() {
  return {
    /* Creating directives are restricted to attribute and elements by default,
     * so no need to explicitly specify directive restrictions */
    scope: {
      section: '='
    },
    templateUrl: 'app/partials/menu-toggle.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();

      $scope.isOpen = function() {
        return controller.isOpen($scope.section);
      };
      $scope.toggle = function() {
        controller.toggleOpen($scope.section);
      };
    }
  };
});
