import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const EventJobSchema = mongoose.Schema({
    eventId: {
        type: String,
        required: [true, 'Event ID is required.']
    },
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED', 'LOCKED', 'STOPPED', 'SCHEDULED', 'NEW'],
        required: [true, 'Event status is required']
    },
    triggeredBy: {
        type: String,
        required: [true, 'Triggered by is required']
    },
    createdOn: { type: Date, default: Date.now }
});
EventJobSchema.plugin(mongoosePaginate);

const EventJobModel = mongoose.model('event-job', EventJobSchema);

export default EventJobModel;