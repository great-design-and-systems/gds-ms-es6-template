import EventModel from '../entity/event';

export default class UpdateEvent {
    constructor(eventId, event, callback) {
        EventModel.findByIdAndUpdate(eventId, event, (err, result) => {
            if (err) {
                console.error(err);
                callback({
                    message: 'Failed updating event'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}