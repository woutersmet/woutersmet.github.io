'use strict';

// Declare app level module which depends on filters, and services
var TeamViewApp = angular.module('TeamViewApp', [
    'ui.bootstrap',
    'TeamView.config',
    'TeamView.controllers',
    'TeamView.decorators',
    'TeamView.directives',
    'TeamView.filters',
    'TeamView.services',
    'TeamView.routes'
  ])

  .run(['$rootScope','$firebase','$location','$routeParams',function($rootScope, $firebase, $location, $routeParams) { //global app setup stuff
      $rootScope.app = global.app;
      //$rootScope.org = global.org; doing it data based now!
      debug($routeParams);
      debug($location.path());
      var orgname = $location.path().split('/')[1];
      debug(orgname);

      //get org data
      var sync = $firebase(new Firebase("https://teamview.firebaseio.com/organisations/" + orgname));

      var org = sync.$asObject();
     $rootScope.org = org;
     debug(org);

      $rootScope.apppath = '/' + global.org.name + '/' + global.app.name;
      $rootScope.orgpath = '/' + global.org.name;
      applyAppStyles();
  }]);

var TeamViewAppControllers = angular.module('TeamView.controllers', ['firebase.utils', 'simpleLogin']);
