import EventJobModel from '../entity/event-job';
export default class CreateEventJob {
  constructor(eventName, triggeredBy, callback) {
    EventJobModel.create({
      eventName: eventName,
      triggeredBy: triggeredBy,
      status: 'NEW'
    }, (err, result) => {
      if (err) {
        global.gdsLogger.logErrror(err);
        callback({
          message: 'Failed creating event job for ' + eventName
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}