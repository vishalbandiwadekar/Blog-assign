const db = require('../db');

const createPost = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let postedBy = req.body.decoded.userId;

    db.post.create({
        title,
        description,
        postedBy
    }, (err, post) => {
        if(err || !post){
            res.json({
                code: 1201,
                message: 'Error while creating post.',
                data: err
              });
        } else {
            res.json({
                code: 1202,
                message: 'Post created successfully.',
                data: post
              });
        }
    });
};

const editPost = (req, res) => {
    let postId = req.body.postId;
    let title = req.body.title;
    let description = req.body.description;
    let postedBy = req.body.decoded.userId;
    
    db.post.updateOne({
        _id: postId
    }, {
        $set:{
            title,
            description,
            postedBy
        }
    }, {
        new: true
    }, (err, updatedPost) => {
        if(err || !updatedPost){
            res.json({
                code: 1203,
                message: 'Error while updating post.',
                data: err
              });
        } else {
            res.json({
                code: 1204,
                message: 'Post updated successfully.',
                data: updatedPost
              });
        }
    });
};

const deletePost = (req, res) => {
    let id = req.body.id;

    db.post.deleteOne({_id: id}, (err, deletedInfo) => {
        if(err){
            res.json({
                code: 1205,
                message: 'Error while deleting post.',
                data: err
              });
        } else {
            res.json({
                code: 1206,
                message: 'Post deleted successfully.',
                data: deletedInfo
            });
        }
    });
};

const getAllPosts = (req, res) => {

    db.post.find({},{__v: 0}, (err, allPosts) => {
        if(err || allPosts.length == 0){
            res.json({
                code: 1207,
                message: 'Error occured or post list is empty.',
                data: err
              });
        } else {
            res.json({
                code: 1208,
                message: 'All posts fetched successfully.',
                data: allPosts
              });
        }
    });
};

const getPost = (req, res) => {
    let postId = req.body.postId;

    db.post.findOne({_id: postId}, {__v: 0}, (err, postDetails) => {
        if(err){
            res.json({
                code: 1209,
                message: 'Error while getting post details.',
                data: err
            });
        } else if(!postDetails){
            res.json({
                code: 1210,
                message: 'Post not found for this id.',
                data: []
            });
        } else {
            res.json({
                code: 1211,
                message: 'Post found.',
                data: postDetails
              });
        }
    });
};

module.exports = {
    createPost,
    editPost,
    deletePost,
    getAllPosts,
    getPost
}