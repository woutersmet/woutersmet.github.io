//app controllers be here
  objectsApp.controller('TVAppObjectListCtrl', function($rootScope,$scope, $routeParams) {
      $scope.items = getObjectItems($routeParams.objectname)
      $scope.message = 'This is app object list screen';
      $scope.object = getObjectByName($routeParams.objectname);

      $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });

  objectsApp.controller('TVAppObjectAddNewCtrl', function($rootScope,$scope, $routeParams) {
      $scope.message = 'This is app add new object screen';
      $scope.object = getObjectByName($routeParams.objectname);

      $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });

  objectsApp.controller('TVAppObjectDetailCtrl', function($rootScope,$scope, $routeParams){
    $scope.message = 'object detail';
    $scope.object = getObjectByName($routeParams.objectname);
    $scope.item = getItemByObjectNameAndItemId($routeParams.objectname,$routeParams.itemid);

    $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });

  objectsApp.controller('TVAppIndexCtrl', function($rootScope,$scope, $routeParams){
    $scope.message = 'App dashboard';

    $scope.appname = global.app.appname;
    $scope.widgets = global.app.widgets;

    $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });
