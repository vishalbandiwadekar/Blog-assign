const mongoose = require('mongoose');

const userSchema = require('./schemas/userSchema');
const postSchema = require('./schemas/postSchema');
const commentSchema = require('./schemas/commentSchema');

let db = {};

db.connectDB = function () {

  let localdb = "mongodb://localhost:27017/blogTest";
  // need to change connection string to connect to any other cloud DBs
  mongoose.connect(
    localdb,
    {
      useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
    }
  ).then(() => {
    console.log('Connected to database!');
  }).catch(() => {
    console.log('Connection failed!');
  });
}

db.user = mongoose.model('user', userSchema);
db.post = mongoose.model('post', postSchema);
db.comment = mongoose.model('comment', commentSchema);

module.exports = db;