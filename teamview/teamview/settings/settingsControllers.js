/*
* SETTINGS CONTROLLERS
 */

  TeamViewAppControllers.controller('TVSettingsCtrl', function($scope){
    $scope.message = 'Settings home';
    $scope.colorthemes = global.system.colorthemes;
  });

  TeamViewAppControllers.controller('TVSettingsObjectDetailCtrl', function($scope, $routeParams){
    $scope.message = 'object detail';

    $scope.object = getObjectById($routeParams.objectid);
  });

  TeamViewAppControllers.controller('TVSettingsObjectAddNewCtrl', function($scope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';
  });

  TeamViewAppControllers.controller('TVSettingsObjectListCtrl', function($scope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is object list settings';
  });
