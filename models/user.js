const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facedata: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },

});


const User = mongoose.model('User', userSchema);