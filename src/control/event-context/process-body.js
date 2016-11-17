import batch from 'batchflow';
import lodash from 'lodash';
import CreateEventContext from '../event-context/create-event-context';
import RemoveEventContextByJobId from '../event-context/remove-event-context-by-job-id';

export default class ProcessBody {
    constructor(eventJobId, body, callback) {
        processBody(eventJobId, body, callback);
    }
}

function processBody(eventJobId, body, callback) {
    const resultBody = {};
    batch(body).sequential()
        .each((field, value, next) => {
            new CreateEventContext(eventJobId, field, value, 'BODY',
                (err, result) => {
                    if (err) {
                        global.gdsLogger.logError(err);
                        new RemoveEventContextByJobId(eventJobId, () => {
                            callback({
                                message: 'Failed saving event context body for field ' + field
                            });
                        });
                    } else {
                        lodash.set(resultBody, field, {
                            id: result._id,
                            value: value
                        });
                        next();
                    }
                });
        })
        .end(() => {
            callback(undefined, resultBody);
        });
}