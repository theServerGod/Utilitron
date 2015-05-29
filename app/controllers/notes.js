app.controller('NotesController', function($scope, $timeout, $animate) {
  var self = this;

  function saveToLocalStorage() {
    localStorage.notes = JSON.stringify($scope.notes);
  }

  function showToast(msg) {
    msg = msg || '';
  }

  $scope.notes = localStorage.notes ? JSON.parse(localStorage.notes) : [];
  /*
   * Saves note to current notes array and persists to localStorage
   */
  $scope.save = function(note, noteIndex) {
    console.log(noteIndex);
    noteIndex = noteIndex || null;
    // Need to check for first index (0) presence as it means an existing note
    if (!noteIndex && noteIndex !== 0)
      $scope.notes.push(note); // Create note

    saveToLocalStorage();
    showToast('Your note has been saved locally');
  };

  $scope.remove = function(index) {
    $scope.notes.splice(index, 1);
    saveToLocalStorage();
    showToast('Note deleted');
  };

  $scope.open = function($event, note, noteIndex) {

  };
});
