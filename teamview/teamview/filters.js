//filters for translation and stuff

angular.module('TeamView.filters', [])
    .filter('lng', function() { //returns local version according to app language
      return function(input) {
            var translations = global.system.translations[global.org.language];
            if (typeof translations[input] !== 'undefined'){
              return translations[input];
            }
            else {
              return input;
            }
          };
    }).filter('tc', function() { //Title Case
      return function(input) {
        //source http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
        return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
      };
    });
