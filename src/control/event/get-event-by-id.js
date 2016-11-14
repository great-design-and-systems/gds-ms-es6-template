import EventModel from '../entity/event';

export default class GetEventById {
  constructor(eventId, callback) {
    EventModel.findOne({
      _id: eventId
    }, (err, event) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed getting an event'
        });
      } else {
        callback(undefined, event);
      }
    });
  }
}