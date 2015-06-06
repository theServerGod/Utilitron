/* Utilitron initialisation */

/* cssmaterialize inits */
$(function() {

  $('.button-collapse').sideNav({
      // FIXME - Config will close sideNav on large displays too
      //closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

  $('.collapsible').collapsible({
      //accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $('.scrollspy').scrollSpy();

  $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      //selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $('select').material_select();

});
