/*
* SETTINGS CONTROLLERS
 */

  TeamViewAppControllers.controller('TVSettingsCtrl', function($scope){
    $scope.message = 'Settings home';
    $scope.colorthemes = global.system.colorthemes;
  })

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

  .controller('TVSettingsAppAddNewCtrl', ['$scope', 'fbutil',function($scope,fbutil) {
    //adding new app
    $scope.message = 'This is adding new app';
    $scope.newapp = {name : 'test'};

    $scope.createApp = function(){
      //alert("Will save" + $scope.newapp.name);
      var ref = fbutil.ref('apps');
      console.log(ref);
      ref.push($scope.newapp);
    };

  }]);
