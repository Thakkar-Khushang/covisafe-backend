const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const actuationSchema = new Schema({
    doorstatus: {
        type: Boolean,
        default: false
    },
    sanitizerstatus: {
        type: Boolean,
        default: false
    },
});


const Actuation = mongoose.model('Actuation', actuationSchema);

module.exports = Actuation


