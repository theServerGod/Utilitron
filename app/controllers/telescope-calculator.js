app.controller('TelescopeCalculatorController', function($scope) {
  $scope.mag = {}; // Telescope Magnification
  /*
   * Watches the mag object which contains both the focal length of the telescope
   * and eyepiece. Only when both values are present, should the magnification be
   * calculated.
   * TFL = Telescope Focal Length, EFL = Eyepiece Focal Length
   */
  $scope.$watch('mag', function() {
    if ($scope.mag && $scope.mag.tfl && $scope.mag.efl) {
      $scope.mag.magnification = $scope.mag.tfl / $scope.mag.efl;
      // Append the 'x' symbol to indicate it is a magnification value
      $scope.mag.magnificationDisplay = $scope.mag.magnification  + 'x';
    } else if ($scope.mag.tfl === null && $scope.mag.efl === null) {
      $scope.mag = {}; // Reset object
    }
  }, true);

  $scope.fr = {}; // Focal Ratio
  /*
   * Watches the fr object which contains both the focal length and aperture of
   * telescope.
   * TFL = Telescope Focal Length
   */
   $scope.$watch('fr', function() {
     if ($scope.fr && $scope.fr.tfl && $scope.fr.aperture) {
       $scope.fr.focalRatio = $scope.fr.tfl / $scope.fr.aperture;
       // Prepend 'f/' symbol to indicate f-stop value
       $scope.fr.focalRatioDisplay = 'f/' + $scope.fr.focalRatio;
     } else if ($scope.fr.tfl === null && $scope.fr.aperture === null) {
       $scope.fr = {}; // Reset object
     }
   }, true);

   $scope.um = {}; // Useful Magnification
   /*
    * Useful manification is double that of the aperature, when measured in mm
    */
    $scope.$watch('um', function() {
      if ($scope.um && $scope.um.aperture) {
        $scope.um.usefulMag = $scope.um.aperture * 2;
        $scope.um.usefulMagDisplay = $scope.um.usefulMag + 'x';
      } else if ($scope.um.aperture === null) {
        $scope.um = {}; // Reset object
      }
    }, true);
});
