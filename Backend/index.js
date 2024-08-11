const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const mysqlconnection=require('./models/db.js');
const userRoute=require('./Routes/User.js');
const authRoute=require('./Middleware/authMiddleware.js');
const taskRoute=require('./Routes/TaskList.js');
const port=8000;

app.use(bodyparser.json());
app.use(cors())

app.use(userRoute);
app.use(authRoute);
app.use(taskRoute)

app.get('/shiv',(req,res)=>{
    return res.send(`<h1>this is shiv route</h1>`)
})

mysqlconnection.connect((err)=>{
    if(err){
        console.log('database connection error',err);
    }
    else{
        console.log('database connection stablished')
    }
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})