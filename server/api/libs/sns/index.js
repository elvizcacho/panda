

var AWS = require('aws-sdk');
import config from '../../../config/environment';

AWS.config.update(config.sns);

var sns = new AWS.SNS();

module.exports = sns;
