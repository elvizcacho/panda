'use strict';

(function() {

  class TopicController {
    constructor(Topic, $state) {
      this.$state = $state;
      this.topics = Topic.query();
    }
    
    schedulePush(topic) {
      this.$state.go('topic_show', {
        topicArn: topic.TopicArn
      });
    }

  }

  angular.module('pandaApp.admin')
    .controller('TopicController', TopicController);
})();
