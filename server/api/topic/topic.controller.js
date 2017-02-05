'use strict';

import Sns from '../libs/sns';
import async from 'async';
import agenda from '../libs/agenda';
import utils from '../libs/utils';

module.exports.list = function(req, res, next) {
  
  async.waterfall([
    function(cb) {
      Sns.listTopics({}, cb);
    },
    function(data, cb) {
      async.map(data.Topics, function(topic, cb) {
        Sns.getTopicAttributes(topic, function(err, data) {
          cb(err, data.Attributes);
        });
      }, cb);
    }
  ], function(err, result) {
    if (err) console.log(err, err.stack);
    else console.log(result);
    res.send(result);
  });
  
  
};

module.exports.get = function(req, res, next) {
  
  async.parallel([
    function(cb){
      agenda.jobs({
        'data.TopicArn': req.params.topicArn
      }, cb);
    },
    function(cb) {
      Sns.getTopicAttributes({ TopicArn: req.params.topicArn }, cb);
    }
  ], function(err, result) {
    var topic = result[1].Attributes;
    topic.messages = result[0];
    if (err) console.log(err, err.stack);
    else console.log();
    res.send(topic);
  });

};

module.exports.schedule = function(req, res, next) {
  var data = req.body.payload || { };
  data.message = req.body.message;
  var apnsJSON = {
			aps: data
		};
		var gcmJSON = {
			data: {
				payload: data
			}
		};
	var gcmString = JSON.stringify(gcmJSON);
	var apnsString = JSON.stringify(apnsJSON);
  var params = {
    Message: JSON.stringify({
      default: data.message,
			APNS: apnsString,
			APNS_SANDBOX: apnsString,
			GCM: gcmString
    }),
    MessageStructure: 'json',
    Subject: req.body.message,
    TopicArn: req.body._id
  };
  /*-------------- exec_at -------------*/
  
  agenda.execAt(
    req.body.userId + '-' + utils.makeid(5),
    function(job, done) {
      console.log('RUN JOB');
      var data = job.attrs.data;
      Sns.publish(data, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        done();
      });
    },
    new Date(Date.parse(req.body.date)),
    params
  );
  /*--------------- END exec_at --------------*/
  
  res.send(data);
  
};

module.exports.removeSchedule = function(req, res, next) {
  
  agenda.cancel({
    name: req.body.name
  }, function(err, result) {
    console.log(result);
    res.send({ok:'ok'});
  });

};
