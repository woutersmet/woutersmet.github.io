  var objectsApp = angular.module('objectsApp', []);

  //Define Routing for app
  objectsApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      /*
      SETTINGS
       */
        when('/Settings',
          {templateUrl: 'teamview/settings/settings_index.html',controller: 'TVSettingsController'}).
        when('/Settings/Objects/List',
          {templateUrl: 'teamview/settings/settings_objects_list.html',controller: 'TVSettingsObjectListController'}).
        when('/Settings/Objects/ViewDetail/:objectId',
          {templateUrl: 'teamview/settings/settings_objects_detail.html',controller: 'TVSettingsObjectDetailController'}).
        when('/Settings/Objects/AddNew',
          {templateUrl: 'teamview/settings/settings_objects_addnew.html',controller: 'TVSettingsObjectAddNewController'}).
      /*
      * APP
       */
      when('/App/:pluralname',
          {templateUrl: 'teamview/app/app_object_list.html',controller: 'TVAppObjectListController'}).
      when('/App/:pluralname/AddNew',
          {templateUrl: 'teamview/app/app_object_addnew.html',controller: 'TVAppObjectAddNewController'}).
        otherwise({
          redirectTo: '/Settings'
        });
  }]);
