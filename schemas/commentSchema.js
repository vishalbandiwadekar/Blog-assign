const mongoose = require('mongoose');

var comment = mongoose.Schema({
    postId: String,
    comment: String,
    commentedBy: String
}, {
    timestamps: true
});

module.exports = comment;