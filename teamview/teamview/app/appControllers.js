//app controllers be here
  objectsApp.controller('TVAppObjectListController', function($scope, $routeParams) {
      $scope.objects = getObjectList($routeParams.pluralname)
      $scope.message = 'This is app object list screen';
      $scope.object = getObjectByPluralName($routeParams.pluralname);
  });

  objectsApp.controller('TVAppObjectAddNewController', function($scope, $routeParams) {
      $scope.message = 'This is app add new object screen';
      $scope.object = getObjectByPluralName($routeParams.pluralname);
  });

  objectsApp.controller('TVAppObjectDetailController', function($scope, $routeParams){
    $scope.message = 'object detail';
    $scope.object = getObjectByNameAndId($routeParams.objectId);
  });

  objectsApp.controller('TVAppIndexController', function($scope, $routeParams){
    $scope.message = 'App dashboard';

    $scope.widgets = global.app.widgets;
  });
