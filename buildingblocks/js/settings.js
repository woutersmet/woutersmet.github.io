  var objectsApp = angular.module('objectsApp', []);

  //Define Routing for app
  objectsApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/ObjectList', {
          templateUrl: 'templates/settings/object_list.html',
          controller: 'ObjectListController'
      }).
        when('/ViewDetail/:objectId', {
          templateUrl: 'templates/settings/object_detail.html',
          controller: 'DetailController'
        }).
        when('/AddNew', {
          templateUrl: 'templates/settings/object_addnew.html',
          controller: 'AddNewController'
        }).
          otherwise({
            redirectTo: '/ObjectList'
          });
  }]);


objectsApp.controller('GlobalNavCtrl',function($scope){
    $scope.navobjects = global.app.objects;
    $scope.appname = global.app.appname;
  });


  objectsApp.controller('DetailController', function($scope, $routeParams){
    $scope.message = 'object detail';
    $scope.object = getObjectById($routeParams.objectId);
  });

  objectsApp.controller('AddNewController', function($scope) {
    $scope.fieldtypes = global.system.fieldtypes;
      $scope.message = 'This is Add new order screen';
  });

  objectsApp.controller('ObjectListController', function($scope) {
      $scope.objects = global.app.objects;
      $scope.message = 'This is Show orders screen';
  });
