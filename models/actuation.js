const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const actuationSchema = new Schema({
    doorstatus: {
        type: Boolean,
        required: true,
    },
    sanitizerstatus: {
        type: Boolean,
        required: true,
    },
});


const Actuation = mongoose.model('Actuation', actuationSchema);

module.exports = Actuation


