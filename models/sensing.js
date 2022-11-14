const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sensingSchema = new Schema({
    isfaceauth: {
        type: Boolean,
        required: true,
    },
    ismask: {
        type: Boolean,
        required: true,
    },
    bodytemp: {
        type: Number,
        required: true,
    },
    reportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
});


const Sensing = mongoose.model('Sensing', sensingSchema);

module.exports = Sensing