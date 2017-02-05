import Agenda from 'agenda';
import config from '../../../config/environment';

var agenda = new Agenda();

console.log(config.mongo.uri);

agenda.database(config.mongo.uri, 'agendaJobs').processEvery('30 seconds');
agenda.maxConcurrency(50000);

agenda.execAt = function(jobName, fn, date, data) {
  agenda.define(jobName, fn);
	agenda.schedule(date, jobName, data);
};

agenda.start();
console.log('[AGENDA IS RUNNING]');

module.exports = agenda;
