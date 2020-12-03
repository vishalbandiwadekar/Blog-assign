const jwt = require('jsonwebtoken');
const db = require('../db');

//This file will contain common functionality needed for any API

const verifyToken = (req, res, next) => {
    const token = req.header('token');
// token key will be stored safely in env file or DB or separate config file, 
// for time being its gitven directly
    jwt.verify(token, 'token_key', (err, decoded) => {
        if(err){
            return res.json({
                code: 2010,
                message: 'Invalid token.',
                data: err
              });
        } else {
            db.user.findOne({userId: decoded.userId}, (err, userDetails) => {
                if(err || !userDetails){
                    return res.json({
                        code: 2011,
                        message: 'Invalid token, user not found.',
                        data: err
                      });
                } else if(!userDetails.loginStatus) {
                    return res.json({
                        code: 2012,
                        message: 'Logged out of system. Please log in.',
                        data: []
                      });
                } else {
                    req.body.decoded = {userId: decoded.userId, email: decoded.email};
                    next();
                }
            });
        }
    });
};

module.exports = {
    verifyToken
}