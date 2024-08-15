const nodemailer=require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();

const Transporter=nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.GMAILUSER,
pass: process.env.GMAILPASSWORD
}
})

module.exports=Transporter