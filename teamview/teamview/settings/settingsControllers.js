/*
* SETTINGS CONTROLLERS
 */

  objectsApp.controller('TVSettingsController', function($scope){
    $scope.message = 'Settings home';
  });

  objectsApp.controller('TVSettingsObjectDetailController', function($scope, $routeParams){
    $scope.message = 'object detail';
    $scope.object = getObjectById($routeParams.objectId);
  });

  objectsApp.controller('TVSettingsObjectAddNewController', function($scope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';
  });

  objectsApp.controller('TVSettingsObjectListController', function($scope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is object list settings';
  });
