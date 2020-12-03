var express = require('express');
var router = express.Router();

let user = require('./users');
let post = require('./post');
let comment = require('./comment');
let common = require('../config/common');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/register', user.registerUser);
router.post('/user/login', user.login);
router.get('/user/logout', common.verifyToken, user.logout);

router.post('/post/create', common.verifyToken, post.createPost);
router.post('/post/edit', common.verifyToken, post.editPost);
router.post('/post/delete', common.verifyToken, post.deletePost);
router.post('/post/getPost', common.verifyToken, post.getPost);
router.get('/post/getAll', common.verifyToken, post.getAllPosts);

router.post('/comment/add', common.verifyToken, comment.addComment);
router.post('/comment/get', common.verifyToken, comment.getComment);


module.exports = router;
