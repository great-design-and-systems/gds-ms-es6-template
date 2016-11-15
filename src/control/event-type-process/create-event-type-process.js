import EventTypeProcessModel from '../../entity/event-type-process';

export default class CreateEventTypeProcess {
  constructor(eventJobId, isAsync, callback) {
    EventTypeProcessModel.create({
      eventJobId: eventJobId,
      isAsync: isAsync
    }, (err, result) => {
      if (err) {
        global.gdsLogger.logError(err);
        callback({
          message: 'Failed to create event type process for job id ' + eventJobId
        });
      } else {
        callback(undefined, result);
      }
    });
  }
}