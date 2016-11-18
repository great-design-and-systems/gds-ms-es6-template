import CreateEventJob from '../control/event-job/create-event-job';
import GetEventByName from '../control/event/get-event-by-name';
import RunProcessEvent from '../control/run-process-event';
import GetEventJobById from '../control/event-job/get-event-job-by-id';
import RemoveEventTypeProcessByJobId from '../control/event-type-process/remove-event-type-process-by-job-id';
import RemoveEventContextByJobId from '../control/event-context/remove-event-context-by-job-id';
import GetEventContextById from '../control/event-context/get-event-context-by-id';
import RemoveEventContextById from '../control/event-context/remove-event-context-by-job-id';
import UpdateEventContext from '../control/event-context/update-event-context';
import UpdateEventJobStatusToCompleted from '../control/event-job/update-event-job-status-to-completed';
import UpdateEventJobStatusToLocked from '../control/event-job/update-event-job-status-to-locked';
import UpdateEventJobStatusToNew from '../control/event-job/update-event-job-status-to-new';
import UpdateEventJobStatusToOnHold from '../control/event-job/update-event-job-status-to-on-hold';
import UpdateEventJobStatusToScheduled from '../control/event-job/update-event-job-status-to-scheduled';
import UpdateEventJobStatusToStopped from '../control/event-job/update-event-job-status-to-stopped';
import UpdateEventJobStatusToInProgress from '../control/event-job/update-event-job-status-to-in-progress';
import RemoveEventJobById from '../control/event-job/remove-event-job-by-id';

export default class EventJobService {
  createEventJob(eventName, context, callback) {
    new GetEventByName(eventName, (err, event) => {
      switch (event.eventType) {
        case 'PROCESS':
          new RunProcessEvent(event, context, callback);
          break;
      }
    });
  }
  removeEventJob(eventJobId, callback) {
    new GetEventJobById(eventJobId, (errEventJob, eventJob) => {
      if (errEventJob) {
        callback(errEventJob);
      } else {
        switch (eventJob.eventType) {
          case 'PROCESS':
            new RemoveEventTypeProcessByJobId(eventJobId, (err) => {
              if (err) {
                callback(err);
              } else {
                removeContexts();
              }
            });
            break;
        }
      }

      function removeContexts() {
        new RemoveEventContextByJobId(eventJobId, (errorRemoveContext) => {
          if (errorRemoveContext) {
            callback(errorRemoveContext);
          } else {
            new RemoveEventJobById(eventJobId, callback);
          }
        });
      }

    });
  }
  getEventJobById(eventJobId, callback) {
    new GetEventJobById(eventJobId, callback);
  }
  getContextField(contextId, callback) {
    new GetEventContextById(contextId, callback);
  }
  removeContextField(contextId, callback) {
    new RemoveEventContextById(contextId, callback);
  }
  updateContextField(contextId, context, callback) {
    new UpdateEventContext(contextId, context, callback);
  }
  updateStatus(eventJobId, status, callback) {
    switch (status) {
      case 'IN_PROGRESS':
        new UpdateEventJobStatusToInProgress(eventJobId, callback);
        break;
      case 'COMPLETED':
        new UpdateEventJobStatusToCompleted(eventJobId, callback);
        break;
      case 'LOCKED':
        new UpdateEventJobStatusToLocked(eventJobId, callback);
        break;
      case 'STOPPED':
        new UpdateEventJobStatusToStopped(eventJobId, callback);
        break;
      case 'SCHEDULED':
        new UpdateEventJobStatusToScheduled(eventJobId, callback);
        break;
      case 'NEW':
        new UpdateEventJobStatusToNew(eventJobId, callback);
        break;
      case 'ON_HOLD':
        new UpdateEventJobStatusToOnHold(eventJobId, callback);
        break;
    }
  }
}