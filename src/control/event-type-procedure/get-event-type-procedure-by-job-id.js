import EventTypeProcedureModel from '../../entity/event-type-procedure';

export default class GetEventTypeProcedureByJobId {
    constructor(eventJobId, interval, callback) {
        EventTypeProcedureModel.find(
            {
                rootEventJobId: eventJobId
            },
            (err, result) => {
                if (err) {
                    callback({
                        message: 'Failed getting procedure event for job id' + eventJobId
                    });
                } else {
                    callback(undefined, result);
                }
            }
        )
    }
}