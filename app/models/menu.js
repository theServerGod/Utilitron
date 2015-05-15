app.factory('menu', [
  '$location',
  '$rootScope',
function($location, $rootScope) {
  var sections = [{
    name: 'Time/Date',
    type: 'toggle',
    pages: [{
      name: 'Time Difference',
      url: '#/timedate/timedifference',
      type: 'link',
      icon: 'fa fa-fw fa-clock-o'
    },
    {
      name: 'Date Difference',
      url: '#/timedate/datedifference',
      type: 'link',
      icon: 'fa fa-fw fa-calendar'
    },
    {
      name: 'Timezone Finder',
      url: '#/timedate/timezone',
      type: 'link',
      icon: 'fa fa-fw fa-globe'
    }]
  },
  {
    name: 'Unit Conversion',
    url: '#/unitconversion',
    type: 'link'
  },
  {
    name: 'Calculator',
    url: '#/calculator',
    type: 'link'
  },
  {
    name: 'Language',
    type: 'toggle',
    pages: [{
      name: 'Dictionary',
      url: '#/language/dictionary',
      type: 'link',
      icon: 'fa fa-fw fa-book'
    },
    {
      name: 'Grammar Reference',
      url: '#/language/grammar',
      type: 'link',
      icon: 'fa fa-fw fa-info-circle'
    }]
  }];

  var self;

  $rootScope.$on('$locationChangeSuccess', onLocationChange);

  return self = {
    sections: sections,

    selectSection: function(section) {
      self.openedSection = section;
    },
    toggleSelectSection: function(section) {
      self.openedSection = (self.openedSection === section ? null : section);
    },
    isSectionSelected: function(section) {
      return self.openedSection === section;
    },

    selectPage: function(section, page) {
      self.currentSection = section;
      self.currentPage = page;
    },
    isPageSelected: function(page) {
      return self.currentPage === page;
    },

  };

  function onLocationChange() {
    /* Since $location.path() removes the '#' must add it in if the new location
     * is an angular $route location, otherwise use whatever $location.path returns */
    var path = window.location.hash ? ('#' + $location.path()) : $location.path();

    // Need to check for '#/' because of above ternary
    if (path == '/' || path == '#/') {
      self.selectSection(null);
      self.selectPage(null, null);
      return;
    }

    var matchPage = function(section, page) {
      if (path === page.url) {
        self.selectSection(section);
        self.selectPage(section, page);
      }
    };

    sections.forEach(function(section) {
      if(section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if(section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });
  }

}]);
