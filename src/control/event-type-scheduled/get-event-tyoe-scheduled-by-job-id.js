import EventTypeScheduledModel from '../../entity/event-type-scheduled';

export default class GetEventTypeScheduledByJobId {
    constructor(eventJobId, callback) {
        EventTypeScheduledModel.find({
            eventJobId: eventJobId
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed getting event type scheduled for job id ' + eventJobId
                });
            } else {
                callback(undefined, result);
            }
        })
    }
}