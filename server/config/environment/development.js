'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/panda-dev'
  },
  sns: {
    accessKeyId: '',
		secretAccessKey: '',
		region: 'eu-west-1',
		endpoint: 'https://sns.eu-west-1.amazonaws.com',
		applications: {
				
		}
  },
  // Seed database on startup
  seedDB: true

};
