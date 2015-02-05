var app = angular.module('sampleApp', ['firebase']);

app.controller('sampleApp', ["$scope", "$firebase",
  function($scope, $firebase){
    var ref = new Firebase('https://teamview.firebaseio.com/');

    //angularjs ref
    var sync = $firebase(ref);

    // download data
    $scope.data = sync.$asObject();
  }]);
