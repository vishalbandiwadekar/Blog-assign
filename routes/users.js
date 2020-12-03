let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let db = require('../db');

// Need validations and flow changes for real time use, for now its working for positive scenarios
const registerUser = (req, res) => {
  let userId = req.body.userId;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email.toString().toLowerCase();
  let phone = req.body.phone;

  db.user.findOne({userId: userId}, (err, userDetails) => {
    if(err){
      res.json({
        code: 1101,
        message: 'Error while getting user info.',
        data: err
      });
    } else if (userDetails){
      res.json({
        code: 1102,
        message: 'User already exists with this username.',
        data: []
    });
    } else {
      let salt = crypto.randomBytes(16).toString('hex');
      encryptedPassword = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512');
      db.user.create({
        userId,
        password: encryptedPassword.toString('hex'),
        firstName,
        lastName,
        email,
        phone,
        salt
      }, (err, user) => {
        if(err || !user){
          res.json({
            code: 1103,
            message: 'Error while saving user details.',
            data: err
          });
        } else {
          res.json({
            code: 1104,
            message: 'User registered successfully. Please login.',
            data: user
          });
        }
      });
    }
  });
};

//can be added OTP flow, captcha, google authenticator for more secure login, its basic flow now
const login = (req, res) => {
  let userId = req.body.userId;
  let password = req.body.password;

  db.user.findOne({ userId }, {_id: 0, userId: 1, email: 1, salt: 1, password: 1}, (err, userDetails) => {
    if(err){
      res.json({
        code: 1105,
        message: 'Error while fetching user details.',
        data: err
      });
    } else if(!userDetails){
      res.json({
        code: 1106,
        message: 'No user found with this id. Please register.',
        data: []
      });
    } else {
      let salt = userDetails.salt;
      let hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512');

      if(hash.toString('hex') === userDetails.password){

        let token = jwt.sign({
          userId: userDetails.userId,
          email: userDetails.email,
          created: new Date()
        },'token_key',);

        db.user.updateOne({
          userId: userDetails.userId
        }, {
          $set:{
            jwtToken: token,
            loginStatus: true
          }}, (err, status) => {
            if(err || !status){
              res.json({
                code: 1109,
                message: 'Error while logging in.',
                data: err
              });
            } else {
              res.json({
                code: 1107,
                message: 'User logged in successfully.',
                data: token
              });
            }
          });
      } else {
        res.json({
          code: 1108,
          message: 'Incorrect password.',
          data: []
        });
      }
    }
  });
};

const logout = (req, res) => {
  let token = req.header('token');
  let details = jwt.decode(token);

  console.log(details.userId);
  if(details){
    db.user.updateOne({
      userId: details.userId
    }, {
      $set:{
        loginStatus: false
      }}, (err, updatedNo) => {
        if(err || !updatedNo){
          res.json({
            code: 1111,
            message: 'Error while log out.',
            data: err
          });
        } else {
          res.json({
            code: 1112,
            message: 'User logged out successfully.',
            data: []
          });
        }
      });
  } else {
    res.json({
      code: 1110,
      message: 'Invalid token provided.',
      data: []
    });
  }
}
module.exports = {
  registerUser,
  login,
  logout
};
