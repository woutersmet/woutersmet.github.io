/*
* USERS CONTROLLERS
 */

  TeamViewAppControllers.controller('TVFeedIndexCtrl', function($scope){
    $scope.reports = global.app.reports;
    $scope.message = 'Feeds';
    $scope.showfeed = true;
  });
