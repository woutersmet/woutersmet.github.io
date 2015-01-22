/*
* SETTINGS CONTROLLERS
 */

  TeamViewApp.controller('TVSettingsCtrl', function($scope){
    $scope.message = 'Settings home';
    $scope.colorthemes = global.system.colorthemes;
  });

  TeamViewApp.controller('TVSettingsObjectDetailCtrl', function($scope, $routeParams){
    $scope.message = 'object detail';

    $scope.object = getObjectById($routeParams.objectid);
  });

  TeamViewApp.controller('TVSettingsObjectAddNewCtrl', function($scope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';
  });

  TeamViewApp.controller('TVSettingsObjectListCtrl', function($scope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is object list settings';
  });
