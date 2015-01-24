'use strict';

// Declare app level module which depends on filters, and services
angular.module('TeamView.config', [])

  // where to redirect users if they need to authenticate (see routeSecurity.js)
  .constant('loginRedirectPath', '/login')

  // your Firebase data URL goes here, no trailing slash
  .constant('FBURL', 'https://teamview.firebaseio.com');
