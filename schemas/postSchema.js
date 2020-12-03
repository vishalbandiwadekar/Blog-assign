const mongoose = require('mongoose');

var post = mongoose.Schema({
    title: String,
    description: String,
    postedBy: String
}, {
    timestamps: true
});

module.exports = post;