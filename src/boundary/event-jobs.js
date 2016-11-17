import CreateEventJob from '../control/event-job/create-event-job';
import RemoveEventJobById from '../control/event-job/remove-event-job-by-id';
import GetEventByName from '../control/event/get-event-by-name';
import CreateEventTypeProcess from '../control/event-type-process/create-event-type-process';
import CreateEventContext from '../control/event-context/create-event-context';
import lodash from 'lodash';

export default class EventJobService {
  createEventJob(eventName, context, callback) {
    new GetEventByName(eventName, (err, event) => {
      console.log('event', event);
      switch (event.eventType) {
        case 'PROCESS':
          runProcessEvent(event, context, callback);
          break;
      }
    });
  }
}

function runProcessEvent(event, context, callback) {
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
            processInput();
        }
      });
    }
  });
}

function processInput(eventJobId, input) {
  lodash.forEach(input, (inputType) => {
    switch (inputType) {
      case 'body':
      case 'BODY':
        processBody(eventJobId, inputType);
        break;
      case 'header':
      case 'HEADER':
        break;
      case 'path':
      case 'PATH':
        break;
      case 'query':
      case 'QUERY':
        break;
    }
  });
}

function processBody(eventJobId, body) {
  lodash.forEach(body, (inputValue, inputField) => {
    
  });
}