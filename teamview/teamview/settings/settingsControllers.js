/*
* SETTINGS CONTROLLERS
 */

  TeamViewAppControllers.controller('TVSettingsCtrl', ['$scope','$rootScope', function($scope, $rootScope){
    $scope.message = 'Settings home';
    $scope.colorthemes = global.system.colorthemes;

    $rootScope.contextlinks = getSideBarLinks('settings');// {test : 'test234'};
  }])

  .controller('TVSettingsObjectDetailCtrl', function($scope, $routeParams){
    $scope.message = 'object detail';

    $scope.object = getObjectById($routeParams.objectid);
  })

  .controller('TVSettingsObjectAddNewCtrl', function($scope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';
  })

  .controller('TVSettingsObjectListCtrl', function($scope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is object list settings';
  })

  .controller('TVSettingsOrganisationCtrl', function($scope) {
  })

  .controller('TVSettingsAppAddNewCtrl', ['$scope', 'fbutil',function($scope,fbutil) {
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
