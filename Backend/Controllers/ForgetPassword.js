const mysql=require('../models/db.js');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
dotenv.config();

const CreateOTP = (req, res) => {
    const { email } = req.body;
    console.log('email------->', email);

    mysql.query(`SELECT * FROM user WHERE email = ?`, [email], (err, users) => {
        if (err) {
            console.log('error------->', err);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong'
            });
        } 

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Email not found'
            });
        } 

        const user = users[0];
        const currentTime = new Date().getTime();
        const otpExpirationTime = user.otpexpiretime ? new Date(user.otpexpiretime).getTime() : 0;

        // Check if the existing OTP is still valid
        if (currentTime < otpExpirationTime) {
            return res.status(200).json({
                success: true,
                message: 'OTP already exists and is still valid',
                otp: user.otptoken
            });
        }

        // Generate a new OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpirationTimeNew = new Date(currentTime + 10 * 60 * 1000); // OTP valid for 10 minutes

        // Update the OTP and expiration time in the database
        mysql.query(
            `UPDATE user SET otptoken = ?, otpexpiretime = ? WHERE email = ?`,
            [otp, otpExpirationTimeNew, email],
            (updateErr) => {
                if (updateErr) {
                    console.log('update error------->', updateErr);
                    return res.status(500).json({
                        success: false,
                        message: 'Could not save OTP'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'New OTP has been sent to your email address',
                    otp: otp
                });
            }
        );
    });
};

const ForgetPassword=(req,res)=>{
const {email,newpassword,otptoken}=req.body;
mysql.query(`select * from user where email=?`,email,(err,user)=>{
    if(err){
        console.log('internal server error ------->',err);
        return res.status(200).json({
            success:false,
            message:'something went wrong'
        })
    }
    else{
        if(user.length==0){
            return res.status(200).json({
                success:false,
                message:'Email not found'
            })
        }
        else{
         let userobj=user[0];
         if(userobj.otptoken!=otptoken){
            return res.status(200).json({
                success:false,
                message:'Invalid OTP'
            })
         }
         else{
            const currentTime = new Date().getTime();
            const otpExpirationTime=userobj.otpexpiretime;
            if(currentTime>otpExpirationTime){
                return res.status(200).json({
                    success:false,
                    message:'OTP has been expired'
                })
            }
            else{
               bcrypt.hash(newpassword,Number(process.env.HASH),(hasherr,hashpassword)=>{
                if(hasherr){
                    console.log('hasherror---->',hasherr)
                    return res.status(200).json({
                        success:false,
                        message:hasherr
                    })
                }
                else{
                    mysql.query(`update user set password=? where email=?`,[hashpassword,email],(err2,changeres)=>{
                        if(err2){
                            console.log('this is errr2---->',err2);
                            return res.status(200).json({
                                success:false,
                                message:'Error while updating password'
                            })
                        }
                        else{
                            //if password has been changed to make null to token and expritime.
                            mysql.query(`update user set otptoken=?, otpexpiretime=? where email=?`,[null,null,email],(err3,finalres)=>{
                             if(err3){
                                console.log('err3-------->',err3)
                                return res.status(200).json({
                                    success:false,
                                    message:err3
                                })
                             }
                             else{
                                return res.status(200).json({
                                    success:true,
                                    message:'Password has been successfully updated'
                                })
                             }
                            })
                            
                        }
                    })
                }
               })
            }
         }
        }
    }
})
}
module.exports={ForgetPassword,CreateOTP};