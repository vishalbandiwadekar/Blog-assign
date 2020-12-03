const db = require('../db');

const addComment = (req, res) => {
    let postId = req.body.postId;
    let comment = req.body.comment;
    let commentedBy = req.body.decoded.userId;

    db.comment.create({
        postId,
        comment,
        commentedBy
    }, (err, comm) => {
        if(err){
            res.json({
                code: 1301,
                message: 'Error while adding comment.',
                data: err
            });
        } else {
            res.json({
                code: 1302,
                message: 'Comment added successfully.',
                data: comm
            });
        }
    });
};

const getComment = (req, res) => {
    let postId = req.body.postId;

    db.comment.find({ postId }, {__v: 0}, (err, comments) => {
        if(err || comments.length == 0){
            res.json({
                code: 1303,
                message: 'Error while getting comment for post or not found.',
                data: err
            });
        } else {
            res.json({
                code: 1304,
                message: 'Comment fetched successfully.',
                data: comments
              });
        }
    });
};

module.exports = {
    addComment,
    getComment
};