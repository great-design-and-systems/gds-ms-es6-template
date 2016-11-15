import EventService from './events';
import {
  GDSDomainDTO,
  GDSDomainPaginateHelper
} from 'gds-config';

const API = process.env.API_NAME || '/api/event/';

export default class EventResource {
  constructor(app) {
    const eventService = new EventService();

    app.get('/', (req, res) => {
      const domain = new GDSDomainDTO();
      domain.addPost('createEvent', 'http://' + req.headers.host + API + 'create-event');
      domain.addGet('getEvents', 'http://' + req.headers.host + API + 'get-events');
      domain.addGet('getEventsById', 'http://' + req.headers.host + API + 'get-event-by-id/:eventId');
      domain.addPut('updateEvent', 'http://' + req.headers.host + API + 'update-event/:eventId');
      domain.addDelete('removeEvent', 'http://' + req.headers.host + API + 'remove-event/:eventId');
      domain.addGet('getEventByName', 'http://' + req.headers.host + API + 'get-event-by-name/:eventName');
      domain.addPost('createJob', 'http://' + req.headers.host + API + 'create-job/:eventName');
      res.status(200).send(domain);
    });

    app.post(API + 'create-event', (req, res) => {
      eventService.createEvent(req.body.name, req.body.eventType, req.body.service, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const createDomain = new GDSDomainDTO('CREATE-EVENT', 'Event has been created');
          createDomain.addGet('getEventsById', 'http://' + req.headers.host + API + 'get-event-by-id/' + result._id);
          createDomain.addPut('updateEvent', 'http://' + req.headers.host + API + 'update-event/' + result._id);
          createDomain.addDelete('removeEvent', 'http://' + req.headers.host + API + 'remove-event/' + result._id);
          createDomain.addGet('getEventByName', 'http://' + req.headers.host + API + 'get-event-by-name/' + result.name);
          res.status(200).send(createDomain);
        }
      });
    });

    app.get(API + 'get-events', (req, res) => {
      eventService.getEvents(new GDSDomainPaginateHelper(req),
        (err, result) => {
          if (err) {
            res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
              err.message
            ))
          } else {
            res.status(200).send(new GDSDomainDTO('GET-EVENTS', result));
          }
        });
    });

    app.get(API + 'get-event-by-id/:eventId', (req, res) => {
      eventService.getEventById(req.params.eventId, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('GET-EVENT-BY-ID', result);
          domain.addPut('updateEvent', 'http://' + req.headers.host + API + 'update-event/' + result._id);
          domain.addDelete('removeEvent', 'http://' + req.headers.host + API + 'remove-event/' + result._id);
          res.status(200).send(domain);
        }
      });
    });

    app.put(API + 'update-event/:eventId', (req, res) => {
      eventService.updateEvent(req.params.eventId, req.body, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('UPDATE-EVENT', 'Event has been updated');
          domain.addGet('getEventsById', 'http://' + req.headers.host + API + 'get-event-by-id/' + result._id);
          domain.addDelete('removeEvent', 'http://' + req.headers.host + API + 'remove-event/' + result._id);
          res.status(200).send(domain);
        }
      });
    });

    app.delete(API + 'remove-event/:eventId', (req, res) => {
      eventService.removeEventById(req.params.eventId, (err) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          res.status(200).send(new GDSDomainDTO('REMOVE-EVENT', 'Event has been removed'));
        }
      });
    });

    app.get(API + 'get-event-by-name/:eventName', (req, res) => {
      eventService.getEventByName(req.params.eventName, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('GET-EVENT-BY-NAME', result);
          domain.addPut('updateEvent', 'http://' + req.headers.host + API + 'update-event/' + result._id);
          domain.addDelete('removeEvent', 'http://' + req.headers.host + API + 'remove-event/' + result._id);
          res.status(200).send(domain);
        }
      });
    });

  }
}