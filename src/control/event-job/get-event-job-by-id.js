import EventJobModel from '../../entity/event-job';
export default class GetEventJobById {
  constructor(eventJobId, callback) {
    EventJobModel.find({
      _id: eventJobId
    }, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'No batch event job found for id ' + eventJobId
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}