import EventJobModel from '../../entity/event-job';
const BATCH_COUNT = process.event.BATCH_COUNT || 25;
export default class GetEventJobs {
    constructor(callback) {
        EventJobModel.find({}).limit(BATCH_COUNT).exec((err, result) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback({
                    message: 'No batch event jobs found.'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}