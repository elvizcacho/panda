'use strict';

(function() {

  class TopicShowController {
    
    constructor(Auth, Topic, $stateParams) {
      this.$stateParams = $stateParams;
      this.user = Auth.getCurrentUser();
      this.Topic = Topic;
      this.topic = Topic.get({ id: $stateParams.topicArn });
      this.subscription = {};
      console.log(this.topic);
      
    }
    
    scheduleNotification(subscription) {
      subscription._id = this.$stateParams.topicArn;
      subscription.userId = this.user._id;
      subscription.payload = JSON.parse(subscription.payload);
      console.log(subscription);
      this.Topic.schedule(subscription);
      this.topic = this.Topic.get({ id: this.$stateParams.topicArn });
    }
    
    removeSchedule(job) {
      this.Topic.removeSchedule({
        _id: this.$stateParams.topicArn,
        name: job.name
      });
      this.topic = this.Topic.get({ id: this.$stateParams.topicArn });
    }
    
  }

  angular.module('pandaApp.admin')
    .controller('TopicShowController', TopicShowController);
})();
