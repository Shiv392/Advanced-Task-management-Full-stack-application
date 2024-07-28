const express=require('express');
const Routes=express.Router();
const SignUp=require('../Controllers/SignUp.js');
const Login=require('../Controllers/Login.js');

Routes.post('/user/signup',SignUp);
Routes.post('/user/login',Login)

module.exports=Routes;