import CreateEventJob from '../control/event-job/create-event-job';
import RemoveEventJobById from '../control/event-job/remove-event-job-by-id';
import GetEventByName from '../control/event/get-event-by-name';
export default class EventJobService {
    createEventJob(eventName, context, callback) {
        new GetEventByName(eventName, (err, event) => {
            console.log('event', event);
        });
    }
}