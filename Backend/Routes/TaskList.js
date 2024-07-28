const express=require('express');
const routes=express.Router();
const {AddTasklist,GetTasklist,EditTasklist,DeleteTasklist,EditTaskStatus} = require('../Controllers/Tasklist.js');

routes.post('/task/gettasklist',GetTasklist);
routes.post('/task/addtask',AddTasklist);
routes.put('/task/edittask',EditTasklist);
routes.delete('/task/deletetask',DeleteTasklist);
routes.put('/task/updatetaskstatus',EditTaskStatus)

module.exports=routes;