const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reportSchema = new Schema({
    date: {
        type: Date,
        required: true,
        timestamp: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    accessstatus: {
        type: Boolean,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report