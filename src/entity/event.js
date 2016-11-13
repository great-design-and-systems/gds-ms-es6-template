import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event name is required.']
    },
    eventType: {
        type: String,
        required: [true, 'Event type is required']
    },
    service: {
        type: String,
        required: [true, 'Service url is required']
    },
    createdOn: { type: Date, default: Date.now }
});
EventSchema.plugin(mongoosePaginate);

const EventModel = mongoose.model('event', EventSchema);

export default EventModel;