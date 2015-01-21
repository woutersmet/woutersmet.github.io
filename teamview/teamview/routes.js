

  var objectsApp = angular.module('objectsApp', [])
  .run(function($rootScope) { //global app setup stuff
      $rootScope.app = global.app;
      applyAppStyles();
  });

  //Define Routing for app
  objectsApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      /*
      * USER
       */
        when('/user',
          {templateUrl: 'teamview/user/user_index.html',controller: 'TVUserCtrl'}).
        when('/user/account',
          {templateUrl: 'teamview/user/user_account.html',controller: 'TVUserAccountCtrl'}).
      /*
      SETTINGS
       */
        when('/settings',
          {templateUrl: 'teamview/settings/settings_index.html',controller: 'TVSettingsCtrl'}).
        when('/settings/team',
          {templateUrl: 'teamview/settings/settings_team.html',controller: 'TVSettingsObjectListCtrl'}).
        when('/settings/objects/list',
          {templateUrl: 'teamview/settings/settings_objects_list.html',controller: 'TVSettingsObjectListCtrl'}).
        when('/settings/objects/detail/:objectid',
          {templateUrl: 'teamview/settings/settings_objects_detail.html',controller: 'TVSettingsObjectDetailCtrl'}).
        when('/settings/objects/addnew',
          {templateUrl: 'teamview/settings/settings_objects_addnew.html',controller: 'TVSettingsObjectAddNewCtrl'}).
      /*
      * REPORTS
       */
       when('/reports',
          {templateUrl: 'teamview/reports/reports_index.html',controller: 'TVReportsCtrl'}).
      /*
      * APP
       */
      when('/app',
          {templateUrl: 'teamview/app/app_index.html',controller: 'TVAppIndexCtrl'}).
      when('/app/:objectname',
          {templateUrl: 'teamview/app/app_item_list.html',controller: 'TVAppItemListCtrl'}).
      when('/app/:objectname/:viewname',
          {templateUrl: 'teamview/app/app_item_list.html',controller: 'TVAppItemListCtrl'}).
      when('/app/:objectname/detail/:itemid',
          {templateUrl: 'teamview/app/app_item_detail.html',controller: 'TVAppItemDetailCtrl'}).
      when('/app/:objectname/addnew',
          {templateUrl: 'teamview/app/app_item_addnew.html',controller: 'TVAppItemAddNewCtrl'}).
        otherwise({
          redirectTo: '/app'
        });
  }]);
