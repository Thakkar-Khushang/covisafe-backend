const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sensingSchema = new Schema({
    isfaceauth: {
        type: Boolean,
        default: false
    },
    ismask: {
        type: Boolean,
        default: false
    },
    bodytemp: {
        type: Number,
        default: 0
    },
});


const Sensing = mongoose.model('Sensing', sensingSchema);

module.exports = Sensing