/*
* SETTINGS CONTROLLERS
 */

  objectsApp.controller('TVSettingsCtrl', function($scope){
    $scope.message = 'Settings home';
  });

  objectsApp.controller('TVSettingsObjectDetailCtrl', function($scope, $routeParams){
    $scope.message = 'object detail';

    $scope.object = getObjectById($routeParams.objectid);
  });

  objectsApp.controller('TVSettingsObjectAddNewCtrl', function($scope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';
  });

  objectsApp.controller('TVSettingsObjectListCtrl', function($scope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is object list settings';
  });
