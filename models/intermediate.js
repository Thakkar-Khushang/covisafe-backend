const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const intermediateSchema = new Schema({
    isfaceauth: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    timeToDie: {
        type: Date,
        required: true,
    }
});


const Sensing = mongoose.model('Intermediate', intermediateSchema);

module.exports = Sensing