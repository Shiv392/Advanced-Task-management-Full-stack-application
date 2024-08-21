const express=require('express');
const Routes=express.Router();
const SignUp=require('../Controllers/SignUp.js');
const Login=require('../Controllers/Login.js');
const {ForgetPassword,CreateOTP}=require('../Controllers/ForgetPassword.js');

Routes.post('/user/createotp',CreateOTP);
Routes.put('/user/forgetpassword',ForgetPassword)
Routes.post('/user/signup',SignUp);
Routes.post('/user/login',Login);


module.exports=Routes;