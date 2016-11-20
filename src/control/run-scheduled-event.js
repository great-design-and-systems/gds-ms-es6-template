import CreateEventJob from './event-job/create-event-job';
import CreateEventTypeScheduled from './event-type-scheduled/create-event-type-scheduled';
import ProcessInput from '../control/process-input';
import RemoveEventJobById from './event-job/remove-event-job-by-id';
import batch from 'batchflow';
import lodash from 'lodash';

export default class RunScheduledEvent {
    constructor(event, context, callback) {
        const resultJob = {};
        new CreateEventJob(event.name, context.session, 'NEW', 'SCHEDULED', (errorJob, processJob) => {
            try {
                if (errorJob) {
                    global.gdsLogger.logError(errorJob);
                    callback({
                        message: 'Failed creating event job for scheduled event type'
                    });
                } else {
                    new CreateEventTypeScheduled(processJob._id, context.data.nextEventJobId, context.data.cronInterval, (errScheduled, resultEventType) => {
                        if (errScheduled) {
                            global.gdsLogger.logError(errScheduled);
                            new RemoveEventJobById(processJob._id, () => {
                                callback({
                                    message: 'Failed creating event context for job id ' + processJob._id
                                });
                            });
                        } else {
                            new ProcessInput(processJob._id, context.input, (errProcessInput, resultInput) => {
                                if (errProcessInput) {
                                    global.gdsLogger.logError(errProcessInput);
                                    new RemoveEventJobById(processJob._id, () => {
                                        callback({
                                            message: 'Failed creating event context for job id ' + processJob._id
                                        });
                                    });
                                } else {
                                    resultJob.jobId = processJob._id;
                                    resultJob.context = resultInput;
                                    callback(undefined, resultJob);
                                }
                            });
                        }

                    });

                }
            } catch (errorJob) {
                global.gdsLogger.logError(errorJob);
                callback({
                    message: 'Failed creating job for ' + event.name
                });
            }
        });
    }
}