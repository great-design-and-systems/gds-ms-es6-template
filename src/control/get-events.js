import EventModel from '../entity/event';

export default class GetEvents {
    constructor(paginate, callback) {
        EventModel.paginate({}, paginate, (err, result) => {
            if (err) {
                console.error(err);
                callback({
                    message: 'Failed getting events'
                });
            } else {
                callback(undefined, result);
            }
        });
    }
}