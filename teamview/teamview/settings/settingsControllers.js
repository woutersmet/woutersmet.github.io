/*
* SETTINGS CONTROLLERS
 */

  TeamViewAppControllers.controller('TVSettingsCtrl', ['$scope','$rootScope', function($scope, $rootScope){
    $scope.message = 'Settings home';
    $scope.colorthemes = global.system.colorthemes;

    $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('TVSettingsOrganisationCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  /*
  PERSONAL
   */
    .controller('TVSettingsPreferencesCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.message = 'This is user preferences';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('TVSettingsProfileCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.message = 'This is user profile';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])


/*
* USERS
 */

  .controller('TVSettingsUserListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.users = global.org.users;
      $scope.message = 'This is user settings';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

/*
* OBJECTS
 */
  .controller('TVSettingsObjectDetailCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
    $scope.message = 'object detail';

    $scope.object = getObjectById($routeParams.objectid);

    $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('TVSettingsObjectAddNewCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('TVSettingsObjectListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is object list settings';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

/*
* APPS
 */

  .controller('TVSettingsAppListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.apps = global.org.apps;
      $scope.message = 'Manage apps';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('TVSettingsAppDetailCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
      $scope.app = global.org.apps[$routeParams.appname];
      $scope.colorthemes = global.system.colorthemes;
      $scope.message = 'Manage app detail';

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])


  .controller('TVSettingsAppAddNewCtrl', ['$scope', '$rootScope','fbutil',function($scope,$rootScope, fbutil) {
    //adding new app
    $scope.message = 'This is adding new app';
    $scope.newapp = {name : 'test'};

    $scope.createOrg = function(){
      //alert("Will save" + $scope.newapp.name);
      var ref = fbutil.ref('orgs');
      console.log(ref);
      ref.child($scope.newapp.name).set($scope.newapp);
    };

    $scope.createApp = function(){
      //alert("Will save" + $scope.newapp.name);
      var ref = fbutil.ref('apps');
      console.log(ref);
      ref.child($scope.newapp.name).set($scope.newapp);
    };

  }]);
