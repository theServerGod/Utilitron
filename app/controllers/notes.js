app.controller('NotesController', function($scope, $timeout, $mdDialog, $mdToast, $animate) {
  var self = this;

  function saveToLocalStorage() {
    localStorage.notes = JSON.stringify($scope.notes);
  }

  function showToast(msg) {
    msg = msg || '';
    $mdToast.show(
      $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(3000)
    );
  }

  $scope.notes = localStorage.notes ? JSON.parse(localStorage.notes) : [];
  /*
   * Saves note to current notes array and persists to localStorage
   */
  $scope.save = function(note, noteIndex) {
    noteIndex = noteIndex || null;
    if (!noteIndex)
      $scope.notes.push(note);

    saveToLocalStorage();
    showToast('Your note has been saved locally');
  };

  $scope.remove = function(index) {
    delete $scope.notes[index];
    saveToLocalStorage();
    showToast('Note deleted');
  };

  $scope.open = function($event, note, noteIndex) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      templateUrl: 'app/partials/dialog-note.tmpl.html',
      locals: {
        note: note || {},
        noteIndex: noteIndex,
        save: $scope.save,
        remove: $scope.remove,
      },
      controller: NoteDialogController
    });
    function NoteDialogController(scope, $mdDialog, note, noteIndex, save, remove) {
      scope.note = note;
      scope.noteIndex = noteIndex;

      scope.closeDialog = function() {
        scope.note = {}; // Clear active note object
        $mdDialog.hide();
      };

      scope.save = function(n) {
        save(n, noteIndex);
        scope.closeDialog();
      };

      scope.delete = function() {
        remove(noteIndex);
        scope.closeDialog();
      };
    }
  };
});
