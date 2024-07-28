const mysql=require('../models/db.js');

const GetTasklist=(req,res)=>{
const email=req.body.email;
mysql.query(`select * from task where useremail=?`,email,(err,task)=>{
    if(err){
        return res.status(502).json({
            success:false,
            message:err
        })
    }
    else{
        return res.status(200).json({
            success:true,
            message:'All task list',
            tasklist:task,
            count:task.length
        })
    }
})
}

const AddTasklist=(req,res)=>{
const {email,title,description}=req.body;
mysql.query(
`insert into task(useremail,title,description,created_at,updated_at,isCompleted) 
values(?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,?)`,
[email,title,description,false],(err,task)=>{
    if(err){
        return res.status(502).json({
            success:false,
            message:err
        })
    }
    else{
        return res.status(201).json({
            success:true,
            message:'New task has been created'
        })
    }
})
}

const DeleteTasklist=(req,res)=>{
const {email,id}=req.body;
console.log('id------->',id)
mysql.query(`delete from task where useremail=? and taskid=?`,[email,id],(err,task)=>{
    if(err){
        return res.status(502).json({
            success:false,
            message:err
        })
    }
    else{
        return res.status(200).json({
            success:true,
            message:'Task has been successfully deleted'
        })
    }
})
}

const EditTasklist=(req,res)=>{
const {email,id,title,description,isCompleted}=req.body;
mysql.query(`update task set title=?,description=?,isCompleted=?, updated_at= CURRENT_TIMESTAMP where taskid=? and useremail=?`,[
    title,description,isCompleted,id,email
],(err,task)=>{
   if(err){
    return res.status(502).json({
        success:false,
        message:err
    })
   }
   else{
    return res.status(200).json({
        success:true,
        message:'Changes has been saved successfully'
    })
   }
})
}

const EditTaskStatus=(req,res)=>{
    const {email,taskid,isCompleted}=req.body;
    mysql.query(`update task set isCompleted=? where useremail=? and taskid=?`,[isCompleted,email,taskid],(err,updateres)=>{
        if(err){
            return res.status(502).json({
                success:false,
                message:err
            })
        }
        else{
         return res.status(200).json({
            success:true,
            message:'Task has been updated'
         })
        }
    })
}


module.exports={GetTasklist,AddTasklist,EditTasklist,DeleteTasklist,EditTaskStatus}