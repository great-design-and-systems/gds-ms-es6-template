import {
    GDSDomainDTO,
    GDSDomainPaginateHelper
} from 'gds-config';
import EventJobService from './event-jobs';
const API = process.env.API_NAME || '/api/event/';
export default class EventJobResource {
    constructor(app) {
        const eventJobService = new EventJobService();

        app.post(API + 'create-job/:eventName', (req, res) => {
            const eventName = req.params.eventName;
            eventJobService.createEventJob(eventName, req.body, (err, result) => {
                if (err) {
                    res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE', err.message));
                } else {
                    const domain = new GDSDomainDTO('JOB', result);
                    res.status(200).send(domain);
                }
            });
        });
    }
}