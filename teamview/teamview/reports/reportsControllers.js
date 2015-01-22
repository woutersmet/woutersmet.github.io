/*
* USERS CONTROLLERS
 */

  TeamViewApp.controller('TVReportsCtrl', function($scope){
    $scope.reports = global.app.reports;
    $scope.message = 'Reports home';
  });


  TeamViewApp.controller('TVReportsAddNewCtrl', function($scope){
    $scope.message = 'Add New Report';
  });


  TeamViewApp.controller('TVReportsViewCtrl', function($scope){
    $scope.message = 'View Report';
  });
