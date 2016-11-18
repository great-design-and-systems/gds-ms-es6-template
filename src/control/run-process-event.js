import CreateEventJob from './event-job/create-event-job';
import CreateEventTypeProcess from './event-type-process/create-event-type-process';
import RemoveEventJobById from './event-job/remove-event-job-by-id';
import ProcessInput from '../control/process-input';

import lodash from 'lodash';
import batch from 'batchflow';

export default class RunProcessEvent {
  constructor(event, context, callback) {
    const resultJob = {};
    new CreateEventJob(event.name, context.session, 'NEW', 'PROCESS', (errorJob, processJob) => {
      try {
        if (errorJob) {
          global.gdsLogger.logError(errorJob);
          callback({
            message: 'Failed creating event job for process event type'
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