'use strict';

angular.module('pandaApp.auth', ['pandaApp.constants', 'pandaApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
