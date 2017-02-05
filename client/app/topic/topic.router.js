'use strict';

angular.module('pandaApp.admin')
  .config(function($stateProvider) {
    $stateProvider.state('topic', {
      url: '/topic',
      templateUrl: 'app/topic/topic.html',
      controller: 'TopicController',
      controllerAs: 'topics',
      authenticate: 'user'
    });
    
    $stateProvider.state('topic_show', {
      url: '/topic/:topicArn',
      templateUrl: 'app/topic/topicShow.html',
      controller: 'TopicShowController',
      controllerAs: 'topic',
      authenticate: 'user'
    });
  });
