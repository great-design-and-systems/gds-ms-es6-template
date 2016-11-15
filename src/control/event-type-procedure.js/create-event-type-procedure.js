import EventTypeProcedureModel from '../../entity/event-type-procedure';

export default class CreateEventTypeProcedure {
    constructor(eventJobId, rootEventJobId, nextEventJobId, previousEventJobId, interval, callback) {
        EventTypeProcedureModel.create(
            {
                eventJobId: eventJobId,
                rootEventJobId: rootEventJobId,
                nextEventJobId: nextEventJobId,
                previousEventJobId: previousEventJobId,
                interval: interval
            },
            (err, result) => {
                if (err) {
                    callback({
                        message: 'Failed creating procedure event for job id' + eventJobId
                    });
                } else {
                    callback(undefined, result);
                }
            }
        )
    }
}