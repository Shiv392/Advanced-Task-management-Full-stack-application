const mysql=require('../models/db.js');
const bcrypt=require('bcrypt');

const SignUp= (req,res)=>{
    console.log('req body',req.body)
    const {name,email,password}=req.body;
    console.log('name---->',name);
    if(!name || !email || !password){
      return res.status(400).json({
        success:false,
        message:'Please provide all details'
      })
    }
    // check is user already present
    mysql.query(`select * from user where email=?`,email,(err,user)=>{
      if(err){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        return res.status(502).json({
            success:false,
            message:err
        })
      }  
      else{
        if(user.length>0){
            return res.status(200).json({
                success:false,
                message:'email is already registered'
            })
        }
        else{
         bcrypt.hash(password,Number(process.env.HASH)).then(hashpassword=>{
         mysql.query(`insert into user(fullname,email,password) values(?,?,?)`,[name,email,hashpassword],(err2,addres)=>{
            if(err2){
                console.log('errorr while ading new user--->',err2);
                return res.status(502).json({
                    success:false,
                    message:err2
                })
            }
            else{
                return res.status(201).json({
                    success:true,
                    message:'User has been created'
                })
            }
         })
         })
         .catch(err=>{
          console.log('error while hashing password--->');
          return res.status(502).json({
            success:false,
            message:err
          })
         })
        }
      }
    })
}
module.exports=SignUp;