const mysql=require('../models/db.js');

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
        const otpExpirationTimeNew = new Date(currentTime + 5 * 60 * 1000); // OTP valid for 5 minutes

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
const {emial}=req.body;
}
module.exports={ForgetPassword,CreateOTP};