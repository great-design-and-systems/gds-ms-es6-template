import EventJobModel from '../../entity/event-job';
export default class RemoveEventJobById {
    constructor(eventJobId, callback) {
        EventJobModel.remove({
            _id: eventJobId
        }, (err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'Failed removing event job for ' + eventJobId
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}