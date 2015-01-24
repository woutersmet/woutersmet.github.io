/*
* USERS CONTROLLERS
 */

  TeamViewAppControllers.controller('TVReportsCtrl', function($scope){
    $scope.reports = global.app.reports;
    $scope.message = 'Reports home';
  });


  TeamViewAppControllers.controller('TVReportsAddNewCtrl', function($scope){
    $scope.message = 'Add New Report';
  });


  TeamViewAppControllers.controller('TVReportsViewCtrl', function($scope){
    $scope.message = 'View Report';
  });
