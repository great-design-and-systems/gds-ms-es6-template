import CreateEventJob from '../control/event-job/create-event-job';
import RemoveEventJobById from '../control/event-job/remove-event-job-by-id';
import ProcessInput from '../control/process-input';

import lodash from 'lodash';
import batch from 'batchflow';


export default class RunProcessEvent {
    constructor(event, context, callback) {
        const resultJob = {};
        new CreateEventJob(event.name, context.session, 'NEW', (errorJob, processJob) => {
            if (errorJob) {
                global.gdsLogger.error(errorJob);
                new RemoveEventJobById(processJob._id, () => {
                    callback({
                        message: 'Failed creating event job for process event type'
                    });
                });
            } else {
                new CreateEventTypeProcess(processJob._id, context.data.isAsync, (errEventTypeProcess, resultProcess) => {
                    if (errEventTypeProcess) {
                        global.gdsLogger.logError(errEventTypeProcess);
                        new RemoveEventJobById(processJob._id, () => {
                            callback({
                                message: 'Failed creating event type process for job id ' + processJob._id
                            });
                        });
                    } else {
                        new ProcessInput(processJob._id, context.input, (errProcessInput, resultInput) => {
                            if (errProcessInput) {
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
        });
    }
}

