//app controllers be here
  objectsApp.controller('TVAppItemListCtrl', function($rootScope,$scope, $routeParams) {
      $scope.message = 'This is app object list screen';
      var object = getObjectByName($routeParams.objectname);
      var viewname = $routeParams.viewname || 'all_' + object.plurallabel;

      var view = getViewByObjectAndName($routeParams.objectname,viewname);

      debug(view);
      $scope.object = object;
      $scope.items = getItemList($routeParams.objectname, view);
      $scope.view = view;

      $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });

  objectsApp.controller('TVAppItemAddNewCtrl', function($rootScope,$scope, $routeParams) {
      $scope.message = 'This is app add new object screen';
      $scope.object = getObjectByName($routeParams.objectname);

      $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });

  objectsApp.controller('TVAppItemDetailCtrl', function($rootScope,$scope, $routeParams){
    $scope.message = 'object detail';
    var object = getObjectByName($routeParams.objectname);
    var item = getItemByObjectNameAndItemId($routeParams.objectname,$routeParams.itemid);

    var layout = object.layouts.detail;

    console.log(layout);
    var filledlayout = createFilledLayout(layout,item);

    debug(filledlayout);
    $scope.object = object;
    $scope.item = item;
    $scope.filledlayout = filledlayout;
    $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });

  objectsApp.controller('TVAppIndexCtrl', function($rootScope,$scope, $routeParams){
    $scope.message = 'App dashboard';

    $scope.appname = global.app.appname;
    $scope.widgets = global.app.widgets;

    $rootScope.leftnavitems = getContextualNavItems('object', $routeParams.objectname);
  });
