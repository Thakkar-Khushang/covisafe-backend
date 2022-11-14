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
        required: true,
        unique: true
    },

});


const User = mongoose.model('User', userSchema);

module.exports = User