const jwt=require('jsonwebtoken');
require('dotenv').config();

const authenticateToken=(req,res,next)=>{
const authheaders=req.headers.authorization;
const token= authheaders

if(!token){
    return res.status(404).json({
        success:false,
        message:'Token is null'
    })
}

jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err){
        return res.status(403).json({
            success:false,
            message:'Invalid token'
        })
    }
    req.user=user;
    next();
})
}
module.exports=authenticateToken;