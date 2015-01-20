//app controllers be here
  objectsApp.controller('TVAppObjectListController', function($scope, $routeParams) {
      $scope.items = getObjectItems($routeParams.pluralname)
      $scope.message = 'This is app object list screen';
      $scope.object = getObjectByPluralName($routeParams.pluralname);
  });

  objectsApp.controller('TVAppObjectAddNewController', function($scope, $routeParams) {
      $scope.message = 'This is app add new object screen';
      $scope.object = getObjectByPluralName($routeParams.pluralname);
  });

  objectsApp.controller('TVAppObjectDetailController', function($scope, $routeParams){
    $scope.message = 'object detail';
    $scope.object = getObjectByPluralName($routeParams.pluralname);
    $scope.item = getObjectByPluralNameAndId($routeParams.pluralname,$routeParams.objectid);
  });

  objectsApp.controller('TVAppIndexController', function($scope, $routeParams){
    $scope.message = 'App dashboard';

    $scope.appname = global.app.appname;
    $scope.widgets = global.app.widgets;
  });
