(function() {
   'use strict';

   /* Services */

   //note to self: what the hell are services?
   angular.module('TeamView.services', [])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

      //from the angularfire seed app
     .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }])

     .factory('leftMenuService', ['$q',function($q){
            return {
              updateLeftMenu: function(){
                    return $q.when("Hello World!");
                }
            };
        }]);
})();
