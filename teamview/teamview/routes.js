"use strict";

angular.module('TeamView.routes', ['ngRoute', 'simpleLogin'])

  .constant('ROUTES', {
    '/home': {
      templateUrl: 'teamview/home/home_index.html',
      controller: 'TVHomeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of displaying its UI components)
        user: ['simpleLogin', function(simpleLogin) {
          return simpleLogin.getUser();
        }]
      }
    },
    '/chat': {
      templateUrl: 'partials/chat.html',
      controller: 'ChatCtrl'
    },
    '/login': {
      templateUrl: 'teamview/home/home_login.html',
      controller: 'TVLoginCtrl'
    },
    '/account': {
      templateUrl: 'partials/account.html',
      controller: 'AccountCtrl',
      // require user to be logged in to view this route
      // the whenAuthenticated method below will resolve the current user
      // before this controller loads and redirect if necessary
      authRequired: true
    },
      '/user':
          {section: 'user', templateUrl: 'teamview/user/user_index.html',controller: 'TVUserCtrl'},
        '/:orgname/:appname/user/account':
          {section: 'user', templateUrl: 'teamview/user/user_account.html',controller: 'TVUserAccountCtrl', authRequired : true},
      /*
      * SETTINGS
       */
        '/:orgname/:appname/settings':
          {section: 'settings', templateUrl: 'teamview/settings/settings_index.html',controller: 'TVSettingsCtrl', authRequired: true},
        '/:orgname/:appname/settings/org':
          {section: 'settings', templateUrl: 'teamview/settings/settings_organisation.html',controller: 'TVSettingsOrganisationCtrl', authRequired: true},
          //users
        '/:orgname/:appname/settings/users':
          {section: 'settings', templateUrl: 'teamview/settings/settings_users_list.html',controller: 'TVSettingsUserListCtrl', authRequired: true},
        '/:orgname/:appname/settings/users/addnew':
          {section: 'settings', templateUrl: 'teamview/settings/settings_users_addnew.html',controller: 'TVSettingsUserAddNewCtrl', authRequired: true},
          //apps
        '/:orgname/:appname/settings/apps':
          {section: 'settings', templateUrl: 'teamview/settings/settings_apps_list.html',controller: 'TVSettingsAppListCtrl', authRequired: true},
        '/:orgname/:appname/settings/apps/detail/:appname':
          {section: 'settings', templateUrl: 'teamview/settings/settings_apps_detail.html',controller: 'TVSettingsAppDetailCtrl', authRequired: true},
        '/:orgname/:appname/settings/apps/addnew':
          {section: 'settings', templateUrl: 'teamview/settings/settings_apps_addnew.html',controller: 'TVSettingsAppAddNewCtrl', authRequired: true},
          //objects
        '/:orgname/:appname/settings/objects':
          {section: 'settings', templateUrl: 'teamview/settings/settings_objects_list.html',controller: 'TVSettingsObjectListCtrl', authRequired: true},
        '/:orgname/:appname/settings/objects/detail/:objectid':
          {section: 'settings', templateUrl: 'teamview/settings/settings_objects_detail.html',controller: 'TVSettingsObjectDetailCtrl', authRequired: true},
        '/:orgname/:appname/settings/objects/addnew':
          {section: 'settings', templateUrl: 'teamview/settings/settings_objects_addnew.html',controller: 'TVSettingsObjectAddNewCtrl', authRequired: true},
      /*
      * REPORTS
       */
       '/:orgname/:appname/reports':
          {section: 'reports', templateUrl: 'teamview/reports/reports_index.html',controller: 'TVReportsCtrl', authRequired: true},
      /*
      * APP ITEMS
       */
      //items
      '/:orgname/:appname/app':
          {section: 'app', templateUrl: 'teamview/app/app_index.html',controller: 'TVAppIndexCtrl', authRequired: true},
      '/:orgname/:appname/app/:objectname':
          {section: 'app', templateUrl: 'teamview/app/app_item_list.html',controller: 'TVAppItemListCtrl', authRequired: true},
      '/:orgname/:appname/app/:objectname/addnew':
          {section: 'app', templateUrl: 'teamview/app/app_item_addnew.html',controller: 'TVAppItemAddNewCtrl', authRequired: true},
      '/:orgname/:appname/app/:objectname/:viewname':
          {section: 'app', templateUrl: 'teamview/app/app_item_list.html',controller: 'TVAppItemListCtrl', authRequired: true},
      '/:orgname/:appname/app/:objectname/detail/:itemid':
          {section: 'app', templateUrl: 'teamview/app/app_item_detail.html',controller: 'TVAppItemDetailCtrl', authRequired: true},
      //editing / creating views
      '/:orgname/:appname/app/:objectname/:viewname/editview':
          {section: 'settings', templateUrl: 'teamview/app/app_view_edit.html',controller: 'TVAppViewEditCtrl', authRequired: true},
      '/:orgname/:appname/app/:objectname/addnewview':
          {section: 'settings', templateUrl: 'teamview/app/app_view_addnew.html',controller: 'TVAppViewAddNewCtrl'}
  })

  /**
   * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
   * when called, invokes the requireUser() service (see simpleLogin.js).
   *
   * The promise either resolves to the authenticated user object and makes it available to
   * dependency injection (see AuthCtrl), or rejects the promise if user is not logged in,
   * forcing a redirect to the /login page
   */
  .config(['$routeProvider', function($routeProvider) {
    // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
    // unfortunately, a decorator cannot be use here because they are not applied until after
    // the .config calls resolve, so they can't be used during route configuration, so we have
    // to hack it directly onto the $routeProvider object
    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['requireUser', function(requireUser) {
        return requireUser();
      }];
      $routeProvider.when(path, route);
    }
  }])

  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
    angular.forEach(ROUTES, function(route, path) {
      if( route.authRequired ) {
        // adds a {resolve: user: {...}} promise which is rejected if
        // the user is not authenticated or fulfills with the user object
        // on success (the user object is then available to dependency injection)
        $routeProvider.whenAuthenticated(path, route);
      }
      else {
        // all other routes are added normally

        //WOUTER: add resolve stuff for left/top nav? //source: http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
        /*
        route.resolve = {
              leftmenuResult : function(leftMenuService){
                return true;//leftMenuService.updateLeftMenu();
            }
        };
        */

        //menus?
        //$rootScope.leftnavitems = getContextualNavItems(route.section, $routeParams.objectname);

        $routeProvider.when(path, route);
      }
    });
    // routes which are not in our map are redirected to /home
    $routeProvider.otherwise({redirectTo: '/home'});
  }])

  /**
   * Apply some route security. Any route's resolve method can reject the promise with
   * { authRequired: true } to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
  .run(['$rootScope', '$location', 'simpleLogin', 'ROUTES', 'loginRedirectPath',
    function($rootScope, $location, simpleLogin, ROUTES, loginRedirectPath) {
      // watch for login status changes and redirect if appropriate
      simpleLogin.watch(check, $rootScope);

      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered
      $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
        if( angular.isObject(err) && err.authRequired ) {
          $location.path(loginRedirectPath);
        }
      });

      function check(user) {
        // used by the changeEmail functionality so the user
        // isn't redirected to the login screen while we switch
        // out the accounts (see changeEmail.js)
        if( $rootScope.authChangeInProgress ) { return; }
        if( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired(path) {
        return ROUTES.hasOwnProperty(path) && ROUTES[path].authRequired;
      }
    }
  ]);
