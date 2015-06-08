app.controller('CalculatorController', function($scope) {
  $scope.calcDisplay = '';

  /**
   * Applies the given operand to the expression
   * @param int/string The operand to apply. Can be either a number or a decimal
   *                  point which makes the corresponding operand a floating point.
   */
  $scope.operand = function(o) {
    $scope.calcDisplay += o;
  };

  /**
   * Applies the given operator to the expression.
   * @param string The operand to apply.
   */
  $scope.operator = function(o) {
    $scope.calcDisplay += o;
  };

  /**
   * Evaluates the expression as present in the calculator display.
   */
   $scope.eval = function() {
     // MUST sanitise input, ESPECIALLY because eval() is being used
     var exp = $scope.calcDisplay.match(/(?:\d*\.)?\d+[\*\/\+\-]*/g);
     var expStr = ''; // This will contain the sanitised contents of the original input
     exp.forEach(function(e) {
       expStr += e;
     });

     // To simplify the solution, we can use eval(), provided we can 'trust' exp's contents
     $scope.calcDisplay = eval(expStr);
   };

   /**
    * Simulates the AC 'All Clear' function on a calculator: clears the display.
    */
    $scope.ac = function() {
      $scope.calcDisplay = '';
    };
});
