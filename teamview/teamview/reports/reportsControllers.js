/*
* USERS CONTROLLERS
 */

  objectsApp.controller('TVReportsCtrl', function($scope){
    $scope.reports = global.app.reports;
    $scope.message = 'Reports home';
  });


  objectsApp.controller('TVReportsAddNewCtrl', function($scope){
    $scope.message = 'Add New Report';
  });


  objectsApp.controller('TVReportsViewCtrl', function($scope){
    $scope.message = 'View Report';
  });
