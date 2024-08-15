const mysql = require('../models/db.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


const Login = (req, res) => {
    const { email, password } = req.body;

    mysql.query(`SELECT * FROM user WHERE email = ?`, email, (err, users) => {
        if (err) {
            return res.status(502).json({
                success: false,
                message: err
            });
        }

        if (users.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'Email not found'
            });
        }

        const user = users[0]; 

        bcrypt.compare(password, user.password, (hashErr, matched) => {
            if (hashErr) {
                console.log('Hashing error:', hashErr);
                return res.status(502).json({
                    success: false,
                    message: hashErr
                });
            }

            if (matched) {
                const access_token=jwt.sign({id:user.id,email:user.email},
                    process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24hr'});
                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    token:access_token
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid password'
                });
            }
        });
    });
};

module.exports = Login;
