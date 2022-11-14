const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const actuationSchema = new Schema({
    reportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },

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


