const mongoose = require('mongoose');

var user = mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    jwtToken: String,
    loginStatus: Boolean,
    salt: String
}, {
    timestamps: true
});

module.exports = user;