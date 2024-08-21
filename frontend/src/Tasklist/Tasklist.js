import React, { useEffect, useState,useContext } from 'react';
import TaskTable from './TaskTable';
import CompletedTask from './CompletedTask';
import config from '../config.json';
import axios from 'axios';
import {useFormik} from 'formik';
import SnackbarComp from '../Common/Snackbar.js';
import BackdropComp from '../Common/Backdrop.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DividerComp from '../Common/Divider.js';
import { authContext } from '../Auth/Auth.js';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const TaskInput=()=>{
    const [newtask,setNewTask]=useState([]);
    const [completetask,setCompleteTask]=useState([]);

    const [openbackdrop,setBackdrop]=useState(true);
    const [opensnackbar,setSnackbar]=useState({open:false,message:''});

    const {isAuthenticated,login,logout}=useContext(authContext);
    const navigate=useNavigate();

    const inputform=useFormik({
        initialValues:{
            title:'',
            description:''
        },
        validateOnMount:true,
        validationSchema:yup.object({
            title:yup.string().required('Title is required').max(10),
            description:yup.string().required('Description is required').max(50)
        }),
        onSubmit:(values,{resetForm})=>{
            console.log('form values----->',values);
            AddTask({title:values.title,description:values.description})
            resetForm();
        }
    })

    useEffect(()=>{
        if(isAuthenticated=='true' || isAuthenticated==true){
            GetTasklist();
        }
        else{
            navigate('/')
        }
    },[])

    const GetTasklist=async()=>{
        // setBackdrop(true);
        const apibody={
            "email":localStorage.getItem('emial'),
            "token":localStorage.getItem('token')
        }
        const res= await axios.post(config.gettasklist,apibody,
            {headers:{'Authorization':localStorage.getItem('token')}});
        console.log('res------>',res);
        setNewTask(res.data.tasklist.filter(ele=> ele.isCompleted==0));
        setCompleteTask(res.data.tasklist.filter(ele=> ele.isCompleted==1));
        console.log('new task list------>',newtask);
        console.log('non-complete task list------->',completetask);
        setBackdrop(false);
    }

    const AddTask=async({title,description})=>{
        setBackdrop(true);
     const apibody={
        "email":localStorage.getItem('emial'),
        "token":localStorage.getItem('token'),
        "title":title,
        "description":description
     }
     const addres=await axios.post(config.addtask,apibody,{headers:{'Authorization':localStorage.getItem('token')}});
    setBackdrop(false);
    setSnackbar({open:true,message:addres.data.message});
    setTimeout(() => {
        setSnackbar(false);
    }, 3000);
    GetTasklist();
    }

    const DeleteTask=async(task)=>{
        const headers = {
            'Authorization': localStorage.getItem('token')
          }
        setBackdrop(true);
        const apibody={
            "email":localStorage.getItem('emial'),
            "id":task.taskid
        }
        const deleteres=await axios.delete(config.deletetask,{headers,data:apibody});
        if(deleteres.data.success){
           GetTasklist();
        }
        setBackdrop(false);
        setSnackbar({open:true,message:deleteres.data.message});
        setTimeout(() => {
            setSnackbar(false);
        }, 3000);
    }

    const EditTask= async(editdata)=>{
        setBackdrop(true);
        const apibody={
            "email":localStorage.getItem('emial'),
            "token":localStorage.getItem('token'),
            "id":editdata.id,
            "title":editdata.title,
            "description":editdata.description,
            "isCompleted":0
        }
        const editres=await axios.put(config.edittask,apibody,{headers:{'Authorization':localStorage.getItem('token')}});
        console.log('edit api res------>',editres);
        if(editres.data.success){
            GetTasklist();
        }
        setBackdrop(false);
        setSnackbar({open:true,message:editres.data.message});
        setTimeout(() => {
            setSnackbar({open:false})
        }, 3000);
    }

    const tabledata=({isedit,isdelete,task})=>{
    console.log(isedit,isdelete);
    console.log('task----->',task)
    if(isdelete){
     DeleteTask(task);
    }
    else if(isedit){
        console.log('getting edit data------->',task);
        EditTask(task);
    }
    else{
        UpdateTaskStatus(task.taskid,true)
    }
    }

    const UpdateTaskStatus=async(id,status)=>{
        setBackdrop(true);
        const apibody={
            "taskid":id,
            "email":localStorage.getItem('emial'),
            "isCompleted":status ? 1 : 0
        }
      const res=await axios.put(config.updatetaskstatus,apibody,{headers:{'Authorization':localStorage.getItem('token')}});
      console.log(res);
      setBackdrop(false);
      setSnackbar({open:true,message:res.data.message})
      if(res.data.success){
        GetTasklist();
      }
      setTimeout(() => {
        setSnackbar({open:false})
      }, 3000);
    }

    const completeres=(task)=>{
    UpdateTaskStatus(task.taskid,false)
    }
    return (
        <div className='container mt-2'>
            <div className='mt-3'>
                <form className='taskform' onSubmit={inputform.handleSubmit}>
                <h5>Create New Task:</h5>
                <div className='d-flex' style={{'justifyContent':"space-between","alignItems":"center"}}>
                <div className='d-flex' style={{'gap':"20px",'width':"50%"}}>
                <div style={{'width':"34%"}}>
                <TextField id='title' label='Enter Title' variant="outlined"  {...inputform.getFieldProps('title')}  />
                </div>
                <div>
                    <TextField id='description' label='Enter Description' variant='outlined'
                    {
                        ...inputform.getFieldProps('description')
                    } />
                </div>
                </div>
                <div>
                    <Button color='primary' disabled={!inputform.isValid} variant='contained' type='submit'>
                        Add Task
                    </Button>
                </div>
                </div>
                </form>
            </div>

            <div className='mt-4'>
            <DividerComp />
            </div>

            <div className='d-flex' style={{'gap':"30px",'marginTop':'40px'}}>
            <div>
            <TaskTable tasklist={newtask} datafromTable={tabledata}/>
            </div>
            <div>
            <CompletedTask 
            completetasklist={completetask}
            completelistres={completeres}
            />
            </div>
            </div>

            <BackdropComp openbackdrop={openbackdrop} />
            <SnackbarComp 
            vertical='top' horizontal='right'
            opensnackbar={opensnackbar.open}
             message={opensnackbar.message}
            />
        </div>
    )
}

export default TaskInput;