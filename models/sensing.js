const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sensingSchema = new Schema({
    capturedImg: {
        type: String,
        required: true,
    },
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
});


const Sensing = mongoose.model('Sensing', sensingSchema);

module.exports = Sensing