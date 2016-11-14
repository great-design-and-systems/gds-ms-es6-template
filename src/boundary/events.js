import CreateEvent from '../control/event/create-event';
import GetEvents from '../control/event/get-events';
import GetEventById from '../control/event/get-event-by-id';
import UpdateEvent from '../control/event/update-event';
import RemoveEventById from '../control/event/remove-event-by-id';
import GetEventByName from '../control/event/get-event-by-name';
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
  getEventByName(eventName, callback) {
    new GetEventByName(eventName, callback);
  }
}