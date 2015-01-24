'use strict';

// Declare app level module which depends on filters, and services
var TeamViewApp = angular.module('TeamViewApp', [
    'ui.bootstrap',
    'TeamView.config',
    'TeamView.controllers',
    'TeamView.decorators',
    'TeamView.directives',
    'TeamView.filters',
    'TeamView.routes',
    'TeamView.services'
  ])

  .run(function($rootScope) { //global app setup stuff
      $rootScope.app = global.app;
      applyAppStyles();
  });


var TeamViewAppControllers = angular.module('TeamView.controllers', ['firebase.utils', 'simpleLogin']);
