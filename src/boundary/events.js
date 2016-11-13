import CreateEvent from '../control/create-event';
import GetEvents from '../control/get-events';
import GetEventById from '../control/get-event-by-id';
import UpdateEvent from '../control/update-event';
import RemoveEventById from '../control/remove-event-by-id';
export default class EventService {

    createEvent(name, eventType, service, callback) {
        new CreateEvent(name, eventType, service, callback);
    }

    getEvents(paginate, callback) {
        new GetEvents(paginate, callback);
    }
    getEventById(eventId, callback) {
        new GetEventById(eventId, callback);
    }
    updateEvent(eventId, event, callback) {
        new UpdateEvent(eventId, event, callback);
    }
    removeEventById(eventId, callback) {
        new RemoveEventById(eventId, callback);
    }
}