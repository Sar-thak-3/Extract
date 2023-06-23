const mongoose = require("mongoose")
const {Schema} = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    }
});

const User = mongoose.model('users',UserSchema);
module.exports = User;