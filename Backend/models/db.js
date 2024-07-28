const mysql=require('mysql');
require('dotenv').config();


const mysqlconnection=mysql.createConnection({
user:process.env.USER,
database:process.env.DATABASE,
password:process.env.PASSWORD
})

module.exports=mysqlconnection