const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reportSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    accessstatus: {
        type: Boolean,
        required: true,
    },
    sensing:{
        type: Schema.Types.ObjectId,
        ref: 'Sensing',
    },
    actuation:{
        type: Schema.Types.ObjectId,
        ref: 'Actuation',
    },
    reason: {
        type: String,
        default: ""
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report