import CreateEventJob from '../control/event-job/create-event-job';
import GetEventByName from '../control/event/get-event-by-name';
import RunProcessEvent from '../control/run-process-event';

export default class EventJobService {
    createEventJob(eventName, context, callback) {
        new GetEventByName(eventName, (err, event) => {
            console.log('event', event);
            switch (event.eventType) {
                case 'PROCESS':
                    new RunProcessEvent(event, context, callback);
                    break;
            }
        });
    }
}


