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

  .controller('TVSettingsProfileCtrl', ['$scope', '$rootScope', '$modal', '$firebase', function($scope, $rootScope, $modal, $firebase) {

    var ref = new Firebase("https://teamview.firebaseio.com/organisations");
      $scope.message = 'This is user profile';

      var ref = new Firebase("https://teamview.firebaseio.com/organisations");
      var orgs = $firebase(ref).$asArray();
     $scope.orgs = orgs;

     debug(orgs);

      //see 'modal' here http://angular-ui.github.io/bootstrap/
      $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'teamview/settings/settings_modal_addnew_org.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          //$scope.selected = selectedItem;
        }, function () {
          debug('Modal dismissed at: ' + new Date());
        });
      };

      $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', '$location', '$firebase', function ($scope, $modalInstance, items, $location, $firebase) {

    var sync = $firebase(new Firebase("https://teamview.firebaseio.com/organisations"));

    var orgs = sync.$asObject();
    $scope.orgs = orgs;

    $scope.ok = function () {
      var orglabel = $scope.orglabel;
      var orgname = generateName(orglabel);

      var applabel = $scope.applabel;
      var appname = generateName(applabel)

      var objectlabel = $scope.objectlabel;
      var objectplurallabel = $scope.objectplurallabel;
      var objectname = generateName(objectlabel)

      var loggedinuser = {email : 'woutersmet@gmail.com', firstname : 'Wouter', lastname : 'Smet'};
      username = generateName(loggedinuser.email);

      alert('creating your new org: ' + orglabel);

      var org = {
          config : {
            name : orgname,
            label : orglabel,
            users : {},
            apps : {},
            objects : {},
          },
          objects : {},
          apps : {},
          users : {},
          data : {}
       };

       org.config.apps[appname] = true;
       org.config.objects[objectname] = true;
       org.config.users[username] = true;

       org.apps[appname] = {name : appname, label : applabel};
       org.objects[objectname] = {name : objectname, label : objectlabel, plurallabel : objectplurallabel};

       org.users[username] = {email : loggedinuser.email, firstname : loggedinuser.firstname, lastname : loggedinuser.lastname};

      //save org?
       $scope.orgs[orgname] = org

       orgs.$save();
      //redirect to manage apps/objects in new org
      //$location.path(orgname + '/settings/');
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
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
