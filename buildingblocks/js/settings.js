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

  fieldtypes = [
    {name : 'text', label : 'text', glyphicon : 'pencil'},
    {name : 'longtext', label : 'longtext', glyphicon : 'pencil'},
    {name : 'number', label : 'number', glyphicon : 'pencil'},
    {name : 'date', label : 'date', glyphicon : 'pencil'},
    {name : 'picklist', label : 'picklist', glyphicon : 'pencil'},
  ]

  objects = [
      {
        id : 1,
        name : 'contact',
        pluralname : 'contacts',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'role', label : 'role', type : 'picklist', options : {picklistvalues : ['new','open','closed']}},
          {name : 'email', label : 'email', type : 'email'},
          {name : 'phone', label : 'phone', type : 'text'},
        ]
      },
      {
        id : 2,
        name : 'company',
        pluralname : 'companies',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['internet','retail','agriculture']}},
        ]
      },
      {
        id : 3,
        name : 'deal',
        pluralname : 'deals',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'stage', label : 'stage', type : 'picklist', options : {picklistvalues : ['new','open','closed won', 'closed lost']}},
        ]
      }
  ];

  function getObjectById(id){
    for(i in objects) {
          if(objects[i].id == id) {
              return objects[i];
          }
      }
  }

  objectsApp.controller('DetailController', function($scope, $routeParams){
    $scope.message = 'object detail';
    $scope.object = getObjectById($routeParams.objectId);
  });

  objectsApp.controller('AddNewController', function($scope) {
      $scope.message = 'This is Add new order screen';
  });

  objectsApp.controller('ObjectListController', function($scope) {
      $scope.objects = objects;
      $scope.message = 'This is Show orders screen';
  });
