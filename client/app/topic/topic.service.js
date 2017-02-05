'use strict';

(function() {

  function TopicResource($resource) {
    return $resource('/api/topics/:id/:controller', {
      id: '@_id'
    }, {
      schedule: {
        method: 'POST',
        params: {
          controller: 'schedule'
        }
      },
      removeSchedule: {
        method: 'PUT',
        params: {
          controller: 'schedule'
        }
      }
    });
  }

  angular.module('pandaApp.admin')
    .factory('Topic', TopicResource);
})();
