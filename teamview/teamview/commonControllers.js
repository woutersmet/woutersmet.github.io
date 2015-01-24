TeamViewAppControllers.controller('TVAppNavCtrl',function($scope){
    $scope.navobjects = global.app.objects;
    $scope.appname = global.app.appname;

     $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
  });
