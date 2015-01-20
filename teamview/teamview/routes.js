  var objectsApp = angular.module('objectsApp', []);

  //Define Routing for app
  objectsApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      /*
      SETTINGS
       */
        when('/settings',
          {templateUrl: 'teamview/settings/settings_index.html',controller: 'TVSettingsController'}).
        when('/settings/objects/list',
          {templateUrl: 'teamview/settings/settings_objects_list.html',controller: 'TVSettingsObjectListController'}).
        when('/settings/objects/detail/:objectid',
          {templateUrl: 'teamview/settings/settings_objects_detail.html',controller: 'TVSettingsObjectDetailController'}).
        when('/settings/objects/addnew',
          {templateUrl: 'teamview/settings/settings_objects_addnew.html',controller: 'TVSettingsObjectAddNewController'}).
      /*
      * APP
       */
      when('/app',
          {templateUrl: 'teamview/app/app_index.html',controller: 'TVAppIndexController'}).
      when('/app/:pluralname',
          {templateUrl: 'teamview/app/app_object_list.html',controller: 'TVAppObjectListController'}).
      when('/app/:pluralname/detail/:objectid',
          {templateUrl: 'teamview/app/app_object_detail.html',controller: 'TVAppObjectDetailController'}).
      when('/app/:pluralname/addnew',
          {templateUrl: 'teamview/app/app_object_addnew.html',controller: 'TVAppObjectAddNewController'}).
        otherwise({
          redirectTo: '/app'
        });
  }]);
