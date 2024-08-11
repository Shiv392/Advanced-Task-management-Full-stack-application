import React, { useState } from 'react';
import EditDialog from './Editdialog';
import ConfirmDialog from './ConfirmDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import ConfirmStatus from './StatusconfirmedDialog';

const TaskTable=({tasklist,datafromTable,statusChanged})=>{
    const [open,setOpendialog]=useState(false);
    const [editData,setEditData]=useState(Object);
    const [deleteData,setDeleteData]=useState(Object);
    const [openconfirm,setOpenConfirm]=useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const openEditdialog=(task)=>{
        console.log('edit row dta------>',task)
        setEditData(task)
       setOpendialog(true);
    }

    const openConfirmDialog=(task)=>{
         setDeleteData(task);
         setOpenConfirm(true);
    }

    const confirmdialogres=(confirm)=>{
        console.log('deleteData---->',deleteData)
        setOpenConfirm(false);
        if(confirm){
            datafromTable({isedit:false,isdelete:true,isstatuschanged:false,task:deleteData })
        }
    }

    const EditdialogData=(data)=>{
        console.log('data from edit dialog------>',data)
        if(data){
            console.log('edit dialog response------>',data);
            datafromTable({isedit:true,isdelete:false,isstatuschanged:false,task:{id:editData.taskid,title:data.title,description:data.description} })
        }
        setOpendialog(false);
    }

    const checkboxclick=(task)=>{
        setEditData(task);
        console.log('checkbox clicked---->',task);
        setOpenConfirm(true)
    }

    const statusconfirmres=(confirm)=>{
        setOpenConfirm(false);
        if(confirm){
            datafromTable({isedit:false,isdelete:false,isstatuschanged:true,task:editData });
            // setEditData(Object);
        }
    }

    const tablerow={
        'text-align':"start"
    }

    const tableheader={
        'text-align':'start'
    }

    return(
        <div style={{'height':"300px",'overflow':"auto"}}>
            <h5>Task List:</h5>
            {
                tasklist.length==0 ? <div>No Task to Do</div> : 
            <table className='table table-stripped'>
                <thead style={tableheader}>
                    <tr>
                      <th>Done</th>
                      <th>Task Title</th>
                      <th>Task Description</th>
                      <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasklist.map((task,index)=>(
                            <tr key={index} style={tablerow}>
                                <td className='table-checkbox' style={{'marginTop':'-5px'}}>
                                  {
                                    <Checkbox checked={task.isCompleted==1} onClick={()=>checkboxclick(task)} />
                                  }  
                                </td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                 <IconButton color='warning'  aria-hidden="false" aria-modal="true"  onClick={()=>openEditdialog(task)}>{<EditIcon />}</IconButton>
                                 <IconButton color='error' aria-hidden="false" aria-modal="true" onClick={()=>openConfirmDialog(task)}>{<DeleteIcon/>}</IconButton>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           }
            <EditDialog 
            open={open}
            editdialogres={EditdialogData}
            data={editData}
            fullscreen={fullScreen}
            />

            <ConfirmDialog 
            open={openconfirm}
            message={'Are you sure you want to delete this task?'}
            dialogconfirm={confirmdialogres}
            />

            <ConfirmStatus 
            open={openconfirm}
            message={'Have you done this task?'}
            dialogconfirm={statusconfirmres}
            />
            
        </div>
    )
}
export default TaskTable;